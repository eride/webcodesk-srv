/*
 *    Copyright 2019 Alex (Oleksandr) Pustovalov
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import * as projectResourcesUtils from './projectResourcesUtils';
import constants from '../../../commons/constants';
import PageModelCompiler from './compiler/PageModelCompiler';
import FlowModelCompiler from './compiler/FlowModelCompiler';
import SettingsModelCompiler from './compiler/SettingsModelCompiler';

const componentInstanceModelsMap = new Map();

const flowsResourceVisitor = ({flowModelCompiler, flowsGraphModel}) => ({ nodeModel, parentModel }) => {
  const result = [];
  if (nodeModel && nodeModel.props) {
    if (
      nodeModel.type === constants.GRAPH_MODEL_FLOW_TYPE &&
      nodeModel.props.flowTree
    ) {
      flowModelCompiler.resetCounters();
      flowModelCompiler.compile(nodeModel.props.flowTree);
      const errorsCount = flowModelCompiler.getErrorsCount();
      const changesCount = flowModelCompiler.getChangesCount();
      if (errorsCount > 0 || changesCount > 0) {
        // set error flag on each item in the hierarchy: root -> dir -> flow
        // this is done to indicate the error on the UI resource tree
        flowsGraphModel.mergeNode(nodeModel.key, { props: { hasErrors: errorsCount > 0 } });
        const parentKeys = flowsGraphModel.getAllParentKeys(nodeModel.key);
        if (parentKeys && parentKeys.length > 0) {
          parentKeys.forEach(parentKey => {
            flowsGraphModel.mergeNode(parentKey, { props: { hasErrors: errorsCount > 0 } });
          });
        }
      }
      result.push({
        errorsCount,
        changesCount,
      });
    } else if (
      nodeModel.type === constants.GRAPH_MODEL_FLOW_USER_FUNCTION_TYPE
    ) {
      // we have to compile flow user function reference
      // because it is used for dropping into flow as the copy
      flowModelCompiler.resetCounters();
      flowModelCompiler.compile(nodeModel);
    } else if (
      nodeModel.type === constants.GRAPH_MODEL_FLOW_COMPONENT_INSTANCE_TYPE
    ) {
      // we have to compile flow component instance reference
      // because it is used for dropping into flow as the copy
      flowModelCompiler.resetCounters();
      flowModelCompiler.compile(nodeModel);
    }
  }
  return result;
};

const pagesResourceVisitor = ({pageModelCompiler, pagesGraphModel}) => ({ nodeModel, parentModel }) => {
  const result = [];
  if (nodeModel && nodeModel.props) {
    if (
      nodeModel.type === constants.GRAPH_MODEL_PAGE_TYPE
      && nodeModel.props.componentsTree
    ) {
      pageModelCompiler.resetCounters();
      nodeModel.props.componentsTree = pageModelCompiler.compile(nodeModel.props.componentsTree);
      const errorsCount = pageModelCompiler.getErrorsCount();
      const changesCount = pageModelCompiler.getChangesCount();
      if (errorsCount > 0 || changesCount > 0) {
        // set error flag on each item in the hierarchy: root -> dir -> page
        // this is done to indicate the error on the UI resource tree
        pagesGraphModel.mergeNode(nodeModel.key, { props: { hasErrors: errorsCount > 0 } });
        const parentKeys = pagesGraphModel.getAllParentKeys(nodeModel.key);
        if (parentKeys && parentKeys.length > 0) {
          parentKeys.forEach(parentKey => {
            pagesGraphModel.mergeNode(parentKey, { props: { hasErrors: errorsCount > 0 } });
          });
        }
      }
      result.push({
        errorsCount,
        changesCount,
      });
    } else if (
      nodeModel.type === constants.GRAPH_MODEL_COMPONENT_INSTANCE_TYPE
      && nodeModel.props.componentsTreeChunk
    ) {
      // we have to compile all referenced component instance in the graph,
      // because they are used for dropping into flows
      pageModelCompiler.resetCounters();
      nodeModel.props.componentsTreeChunk = pageModelCompiler.compile(nodeModel.props.componentsTreeChunk);
    }
  }
  return result;
};

const templatesResourceVisitor = ({templateModelCompiler, templatesGraphModel}) => ({ nodeModel, parentModel }) => {
  const result = [];
  if (
    nodeModel &&
    nodeModel.type === constants.GRAPH_MODEL_TEMPLATE_TYPE &&
    nodeModel.props &&
    nodeModel.props.componentsTree
  ) {
    templateModelCompiler.resetCounters();
    nodeModel.props.componentsTree = templateModelCompiler.compile(nodeModel.props.componentsTree);
    const errorsCount = templateModelCompiler.getErrorsCount();
    const changesCount = templateModelCompiler.getChangesCount();
    if (errorsCount > 0 || changesCount > 0) {
      // set error flag on each item in the hierarchy: root -> dir -> page
      // this is done to indicate the error on the UI resource tree
      templatesGraphModel.mergeNode(nodeModel.key, { props: { hasErrors: errorsCount > 0 } });
      const parentKeys = templatesGraphModel.getAllParentKeys(nodeModel.key);
      if (parentKeys && parentKeys.length > 0) {
        parentKeys.forEach(parentKey => {
          templatesGraphModel.mergeNode(parentKey, { props: { hasErrors: errorsCount > 0 } });
        });
      }
    }
    result.push({
      errorsCount,
      changesCount,
    });
  }
  return result;
};

const settingsResourceVisitor = ({settingsModelCompiler}) => ({ nodeModel, parentModel }) => {
  const result = [];
  if (
    nodeModel &&
    nodeModel.type === constants.GRAPH_MODEL_SETTINGS_TYPE &&
    nodeModel.props &&
    nodeModel.props.settingsProperties
  ) {
    settingsModelCompiler.resetCounters();
    settingsModelCompiler.compile(nodeModel);
    const errorsCount = settingsModelCompiler.getErrorsCount();
    const changesCount = settingsModelCompiler.getChangesCount();
    result.push({
      errorsCount,
      changesCount,
    });
  }
  return result;
};

function componentInstancesResourceVisitor ({ nodeModel, parentModel }) {
  const result = [];
  if (nodeModel && nodeModel.type === constants.GRAPH_MODEL_COMPONENT_INSTANCE_TYPE) {
    result.push(nodeModel);
  }
  return result;
}

// export function checkResources(declarationsInFiles) {
//   let newFlowsCount = 0;
//   let newPagesCount = 0;
//   if (declarationsInFiles && declarationsInFiles.length > 0) {
//     declarationsInFiles.forEach(declarationsInFile => {
//       if (declarationsInFile.isInFlows){
//         newFlowsCount++;
//       }
//       if (declarationsInFile.isInPages) {
//         newPagesCount++;
//       }
//     });
//   }
//   let flowModels = [];
//   const flowsGraphModel =
//     projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_FLOWS_TYPE);
//   if (flowsGraphModel) {
//     flowModels = flowsGraphModel.traverse(flowsResourceVisitor);
//   }
//   let pageModels = [];
//   const pagesGraphModel = projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_PAGES_TYPE);
//   if (pagesGraphModel) {
//     pageModels = pagesGraphModel.traverse(pagesResourceVisitor);
//   }
//   if ((flowModels.length + newFlowsCount) > 10 ||
//     (pageModels.length + newPagesCount) > 5) {
//     throw Error('Wrong resources');
//   }
// }

export function compileResources () {

  const pagesGraphModel =
    projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_PAGES_TYPE);
  const templatesGraphModel =
    projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_TEMPLATES_TYPE);
  const componentsGraphModel =
    projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_COMPONENTS_TYPE);
  const userFunctionsGraphModel =
    projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_USER_FUNCTIONS_TYPE);
  const flowsGraphModel =
    projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_FLOWS_TYPE);

  const settingsConfGraphModel =
    projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_SETTINGS_CONF_TYPE);
  const settingsGraphModel =
    projectResourcesUtils.getGraphByResourceType(constants.RESOURCE_IN_SETTINGS_TYPE);

  // We have to gather all instances into a single map that let us check if there is such an instance
  componentInstanceModelsMap.clear();
  if (pagesGraphModel) {
    const componentInstanceModels = pagesGraphModel.traverse(componentInstancesResourceVisitor);
    if (componentInstanceModels && componentInstanceModels.length > 0) {
      componentInstanceModels.forEach(componentInstanceModel => {
        if (componentInstanceModel.props) {
          const { props: { componentName, componentInstance } } = componentInstanceModel;
          componentInstanceModelsMap.set(`${componentName}_${componentInstance}`, componentInstanceModel);
        }
      });
    }
  }

  let changesCounter = 0;

  /**
   * Compile settings
   */
  const settingsModelCompiler = new SettingsModelCompiler({ settingsConfGraphModel });
  const settingsCompilationResults =
    settingsGraphModel.traverse(
      settingsResourceVisitor({settingsModelCompiler})
    );
  if (settingsCompilationResults && settingsCompilationResults.length > 0) {
    settingsCompilationResults.forEach(settingsCompilationResult => {
      if (settingsCompilationResult) {
        if (settingsCompilationResult.changesCount > 0) {
          changesCounter += settingsCompilationResult.changesCount;
        }
      }
    });
  }

  /**
   * Compile all pages
   *
   */
  let pagesErrorsCount = 0;
  const pageModelCompiler = new PageModelCompiler({ componentsGraphModel });
  const pagesCompilationResults =
    pagesGraphModel.traverse(
      pagesResourceVisitor({pageModelCompiler, pagesGraphModel})
    );
  if (pagesCompilationResults && pagesCompilationResults.length > 0) {
    pagesCompilationResults.forEach(pagesCompilationResult => {
      if (pagesCompilationResult) {
        if (pagesCompilationResult.errorsCount > 0) {
          pagesErrorsCount += pagesCompilationResult.errorsCount;
        }
        if (pagesCompilationResult.changesCount > 0) {
          changesCounter += pagesCompilationResult.changesCount;
        }
      }
    });
  }
  // set error flag on the root key of the pages tree
  pagesGraphModel.mergeNode(pagesGraphModel.getRootKey(), { props: { hasErrors: pagesErrorsCount > 0 } });

  /**
   * Compile all templates
   *
   */
  let templatesErrorsCount = 0;
  const templateModelCompiler = new PageModelCompiler({ componentsGraphModel });
  const templatesCompilationResults =
    templatesGraphModel.traverse(
      templatesResourceVisitor({templateModelCompiler, templatesGraphModel})
    );
  if (templatesCompilationResults && templatesCompilationResults.length > 0) {
    templatesCompilationResults.forEach(templatesCompilationResult => {
      if (templatesCompilationResult) {
        if (templatesCompilationResult.errorsCount > 0) {
          templatesErrorsCount += templatesCompilationResult.errorsCount;
        }
        if (templatesCompilationResult.changesCount > 0) {
          changesCounter += templatesCompilationResult.changesCount;
        }
      }
    });
  }
  // set error flag on the root key of the templates tree
  templatesGraphModel.mergeNode(templatesGraphModel.getRootKey(), { props: { hasErrors: templatesErrorsCount > 0 } });

  /**
   * Compile all flows
   */
  let flowsErrorsCount = 0;
  const flowModelCompiler = new FlowModelCompiler({
    pagesGraphModel,
    componentsGraphModel,
    userFunctionsGraphModel,
    componentInstanceModelsMap
  });
  const flowsCompilationResults =
    flowsGraphModel.traverse(
      flowsResourceVisitor({flowModelCompiler, flowsGraphModel})
    );
  if (flowsCompilationResults && flowsCompilationResults.length > 0) {
    flowsCompilationResults.forEach(flowsCompilationResult => {
      if (flowsCompilationResult) {
        if (flowsCompilationResult.errorsCount > 0) {
          flowsErrorsCount += flowsCompilationResult.errorsCount;
        }
        if (flowsCompilationResult.changesCount > 0) {
          changesCounter += flowsCompilationResult.changesCount;
        }
      }
    });
  }
  // set error flag on the root key of the flows tree
  flowsGraphModel.mergeNode(flowsGraphModel.getRootKey(), { props: { hasErrors: flowsErrorsCount > 0 } });

  componentInstanceModelsMap.clear();

  return changesCounter > 0;
}