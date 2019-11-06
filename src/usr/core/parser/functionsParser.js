import isEqual from 'lodash/isEqual';
import uniqWith from 'lodash/uniqWith';
import { getSourceAst } from '../utils/babelParser';
import { traverse } from '../utils/astUtils';
import path from 'path-browserify';
import { getWcdAnnotations } from '../utils/commentsUtils';
import constants from '../../../commons/constants';
import { makeResourceModelCanonicalKey, makeResourceModelKey } from '../utils/resourceUtils';

function getAbsoluteImportPath (sourceImportPath, rootDirPath, currentFilePath) {
  let absoluteImportPath = sourceImportPath;
  if (absoluteImportPath.charAt(0) === '.') {
    // we have relative import path
    const fileDirPath = path.dirname(currentFilePath);
    // need to resolve it to the absolute path
    absoluteImportPath = path.resolve(fileDirPath, absoluteImportPath);
    // remove project root dir path part from the absolute path
    absoluteImportPath = absoluteImportPath
      .replace(`${rootDirPath}${constants.FILE_SEPARATOR}`, '');
  }
  return absoluteImportPath;
}

function getAnnotationImportSpecifiers (ast, rootDirPath, filePath) {
  const importSpecifiers = {};
  traverse(ast, node => {
    const {type, leadingComments} = node;
    if (type === 'ExpressionStatement' || type === 'ExportNamedDeclaration') {
      // get comments
      if (leadingComments && leadingComments.length > 0) {
        let wcdAnnotations = {};
        leadingComments.forEach(leadingComment => {
          if (leadingComment && leadingComment.value) {
            wcdAnnotations = {...wcdAnnotations, ...getWcdAnnotations(leadingComment.value)};
          }
        });
        if (wcdAnnotations[constants.ANNOTATION_FUNCTION_ARGUMENT_PROP_TYPES]) {
          if (wcdAnnotations[constants.ANNOTATION_FUNCTION_ARGUMENT_PROP_TYPES].length === 3) {
            const annotationParts = wcdAnnotations[constants.ANNOTATION_FUNCTION_ARGUMENT_PROP_TYPES];
            // there should be: PropTypesVariableName from some/path/to/File
            // there should be: PropTypesVariableName from ./FilePath
            // [0]: PropTypesVariableName
            // [2]: ./FilePath
            importSpecifiers[annotationParts[0]] = {
              importName: annotationParts[0],
              importPath: getAbsoluteImportPath(annotationParts[2], rootDirPath, filePath),
            };
          }
        }
      }
    }
  });
  return importSpecifiers;
}

function getExternalPropTypesImport(name, importSpecifiers) {
  let result = null;
  const externalPropTypesImport = importSpecifiers[name];
  if (externalPropTypesImport) {
    // we have to use common resource keys for the imported values in the props
    // then we can find the PropTypes resource description in the graph model
    result = makeResourceModelCanonicalKey(
      makeResourceModelKey(externalPropTypesImport.importPath),
      name
    )
  }
  return result;
}

function testAnnotationsInComments(leadingComments, importSpecifiers, declaration) {
  if (leadingComments && leadingComments.length > 0) {
    let wcdAnnotations = {};
    leadingComments.forEach(leadingComment => {
      if (leadingComment && leadingComment.value) {
        wcdAnnotations = { ...wcdAnnotations, ...getWcdAnnotations(leadingComment.value) };
      }
    });
    if (wcdAnnotations[constants.ANNOTATION_FUNCTION_ARGUMENT_PROP_TYPES]) {
      if (wcdAnnotations[constants.ANNOTATION_FUNCTION_ARGUMENT_PROP_TYPES].length === 3) {
        const annotationParts = wcdAnnotations[constants.ANNOTATION_FUNCTION_ARGUMENT_PROP_TYPES];
        const externalProperties = getExternalPropTypesImport(annotationParts[0], importSpecifiers);
        if (externalProperties) {
          declaration.externalProperties = externalProperties;
        }
      }
      // we don't need this annotation any more - we resolve prop types for the argument
      delete wcdAnnotations[constants.ANNOTATION_FUNCTION_ARGUMENT_PROP_TYPES];
    }
    declaration.wcdAnnotations = wcdAnnotations;
  }
  return declaration;
}

function getFunctionBodyDispatches(functionBodyAst, importSpecifiers) {
  let result = [];
  traverse(functionBodyAst, node => {
    if (node.type === 'ExpressionStatement') {
      const { expression, leadingComments } = node;
      if (expression && expression.type === 'CallExpression') {
        const { callee, arguments: expressionArguments } = expression;
        // see if the call is to dispatch
        if (callee && callee.type === 'Identifier' && callee.name === 'dispatch') {
          // there 2 arguments have to be
          if (expressionArguments && expressionArguments.length > 0) {
            const firstArgument = expressionArguments[0];
            // the first argument must be the string name
            if (firstArgument && firstArgument.type === 'StringLiteral') {
              let functionDispatchDeclaration = {};
              // set dispatch declaration name
              functionDispatchDeclaration.name = firstArgument.value;
              // add comments if there are some
              functionDispatchDeclaration =
                testAnnotationsInComments(leadingComments, importSpecifiers, functionDispatchDeclaration);
              result.push(functionDispatchDeclaration);
            }
          }
        }
      }
    }
  });
  result = uniqWith(result, isEqual);
  return result;
}

export const getFunctionDeclarations = (ast, importSpecifiers) => {
  const result = [];
  if (ast && ast.body && ast.body.length > 0) {
    ast.body.forEach(node => {
      if (node.type === 'ExportNamedDeclaration') {
        const {declaration, leadingComments} = node;
        // console.info('ExportNamedDeclaration passed');
        if (declaration && declaration.type === 'VariableDeclaration') {
          // console.info('VariableDeclaration passed');
          const {declarations} = declaration;
          if (declarations && declarations.length > 0) {
            const {type: varDeclarationType, id: varId, init: varInit,} = declarations[0];
            if (varDeclarationType === 'VariableDeclarator') {
              // console.info('VariableDeclarator passed');
              if (varId && varInit) {
                const {type: varIdType, name: varIdName} = varId;
                const {type: varInitType, params: varInitParams, body: varInitBody} = varInit;
                if (varIdType === 'Identifier' && varInitType === 'ArrowFunctionExpression') {
                  // console.info('Identifier & ArrowFunctionExpression passed');
                  let functionDeclaration = {};
                  // set user function name
                  functionDeclaration.functionName = varIdName;
                  // get parameters of the user function (arrow function)
                  if (varInitParams && varInitParams.length > 0) {
                    functionDeclaration.parameters = [];
                    varInitParams.forEach(varInitParam => {
                      functionDeclaration.parameters.push({
                        name: varInitParam.name,
                      });
                    });
                  }
                  // add comments if there are some
                  functionDeclaration =
                    testAnnotationsInComments(leadingComments, importSpecifiers, functionDeclaration);
                  // check user function body, it has to be the arrow function with dispatch parameter
                  if (varInitBody) {
                    const {
                      type: varInitBodyType,
                      generator: varInitBodyGenerator,
                      //async: varInitBodyAsync, // todo: should we pass/test async declaration here?
                      params: varInitBodyParams,
                      body: varInitBodyBody,
                    } = varInitBody;
                    if (!varInitBodyGenerator && varInitBodyType === 'ArrowFunctionExpression') {
                      // console.info('varInitBodyGenerator & ArrowFunctionExpression passed');
                      if (varInitBodyParams && varInitBodyParams.length > 0) {
                        // see if the parameter of the nested function has dispatch name only
                        if (varInitBodyParams[0].type === 'Identifier' && varInitBodyParams[0].name === 'dispatch') {
                          // get dispatches inside the function body
                          functionDeclaration.dispatches = getFunctionBodyDispatches(varInitBodyBody, importSpecifiers);
                          // that's valid function declaration - we add it the list of user functions
                          result.push(functionDeclaration);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  return result;
};

export const findFunctionDeclarations = (sourceCode, rootDirPath, filePath) => {
  const ast = getSourceAst(sourceCode);
  const importSpecifiers = getAnnotationImportSpecifiers(ast, rootDirPath, filePath);
  return getFunctionDeclarations(ast, importSpecifiers);
};