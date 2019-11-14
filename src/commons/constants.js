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

module.exports = {

  CURRENT_APPLICATION_VERSION: '2.0.0-beta',
  AUTHOR_COPYRIGHT: 'Alex Pustovalov',
  DATE_COPYRIGHT: '2018-2020',

  URL_WEBCODESK_TUTORIAL: 'https://github.com/webcodesk/webcodesk-srv',
  URL_WEBCODESK_ISSUE_TRACKER: 'https://github.com/webcodesk/webcodesk-srv/issues',
  URL_WEBCODESK_USER_GUIDE: 'https://github.com/webcodesk/webcodesk-srv',

  URL_GITHUB: 'https://github.com',
  URL_GITHUB_API: 'https://api.github.com',
  URL_GITHUB_MARKET_REPOSITORY: 'https://github.com/webcodesk/webcodesk',

  MARKET_NEW_PROJECTS_TYPE: 'MARKET_NEW_PROJECTS_TYPE',
  MARKET_NEW_PACKAGES_TYPE: 'MARKET_NEW_PACKAGES_TYPE',

  // Used in project configuration initialization.
  // When the values are changed, change GRAPH_MODEL_DIR_* values accordingly.
  PROJECT_SETTINGS_FILE_NAME: '.webcodesk',
  FILE_NAME_PACKAGE: 'package.json',
  FILE_NAME_TS_CONFIG: 'tsconfig.json',
  FILE_NAME_README: 'README.md',
  FILE_NAME_YARN_LOCK: 'yarn.lock',
  DIR_NAME_PUBLIC: 'public',
  DIR_NAME_SRC: 'src',
  DIR_NAME_ETC: 'etc',
  DIR_NAME_USR: 'usr',
  DIR_NAME_APP: 'app',
  DIR_NAME_SCHEMA: 'schema',
  DIR_NAME_INDICES: 'indices',
  DIR_NAME_SCHEMA_PROD: 'schema-prod',
  DIR_NAME_INDICES_PROD: 'indices-prod',
  DIR_NAME_PAGES: 'pages',
  DIR_NAME_FLOWS: 'flows',
  DIR_NAME_TEMPLATES: 'templates',
  DIR_NAME_DOWNLOAD: '__download__',
  EXPORT_DIR_NAME_FUNCTIONS: 'functions',
  EXPORT_DIR_NAME_CONTAINERS: 'containers',
  EXPORT_DIR_NAME_PAGES: 'pages',
  EXPORT_DIR_NAME_START_WRAPPER: 'startWrapper',
  EXPORT_DIR_NAME_STORE: 'store',
  FILE_NAME_PAGES: 'pages',
  FILE_NAME_FLOWS: 'flows',
  FILE_NAME_ROUTER: 'routes',
  NODE_MODULES_DIR_NAME: 'node_modules',
  REACT_SCRIPTS_NAME: 'react-scripts',
  REACT_APP_FRAMEWORK: '@webcodesk/react-app-framework',

  RESOURCE_IN_COMPONENTS_TYPE: 'RESOURCE_IN_COMPONENTS_TYPE',
  RESOURCE_IN_USER_FUNCTIONS_TYPE: 'RESOURCE_IN_USER_FUNCTIONS_TYPE',
  RESOURCE_IN_PROP_TYPES_TYPE: 'RESOURCE_IN_PROP_TYPES_TYPE',
  RESOURCE_IN_MARKDOWN_TYPE: 'RESOURCE_IN_MARKDOWN_TYPE',
  RESOURCE_IN_CLIPBOARD_TYPE: 'RESOURCE_IN_CLIPBOARD_TYPE',
  RESOURCE_IN_PAGES_TYPE: 'RESOURCE_IN_PAGES_TYPE',
  RESOURCE_IN_FLOWS_TYPE: 'RESOURCE_IN_FLOWS_TYPE',
  RESOURCE_IN_TEMPLATES_TYPE: 'RESOURCE_IN_TEMPLATES_TYPE',

  FILE_SEPARATOR: '/',
  FILE_SEPARATOR_REGEXP: new RegExp(/\//g),
  JS_FILE_EXTENSION: '.js',
  TS_FILE_EXTENSION: '.ts',
  TSX_FILE_EXTENSION: '.tsx',
  MODEL_KEY_SEPARATOR: '.',
  RESOURCE_NAME_INVALID_SEPARATOR_REGEXP: new RegExp(/\./g),
  RESOURCE_NAME_VALID_SEPARATOR: '_',
  COMPONENT_NAME_VALID_REGEXP: new RegExp(/^[A-Za-z][\w]*$/),
  USER_FUNCTION_NAME_VALID_REGEXP: new RegExp(/^[A-Za-z][\w]*$/),
  PROJECT_NAME_VALID_REGEXP: new RegExp(/^[A-Za-z][\w_-]*$/),
  FILE_NAME_VALID_REGEXP: new RegExp(/^(?!\/)[A-Za-z][\w_-]*$/),
  FILE_PATH_VALID_REGEXP: new RegExp(/^(?!\/)[A-Za-z][\w_/-]*$/),
  SERVER_PORT_VALID_REGEXP: new RegExp(/^\d{4}$/),

  GRAPH_MODEL_FLOWS_ROOT_KEY: 'GRAPH_MODEL_FLOWS_ROOT_KEY',
  GRAPH_MODEL_PAGES_ROOT_KEY: 'GRAPH_MODEL_PAGES_ROOT_KEY',
  GRAPH_MODEL_COMPONENTS_ROOT_KEY: 'GRAPH_MODEL_COMPONENTS_ROOT_KEY',
  GRAPH_MODEL_USER_FUNCTIONS_ROOT_KEY: 'GRAPH_MODEL_USER_FUNCTIONS_ROOT_KEY',
  GRAPH_MODEL_PROP_TYPES_ROOT_KEY: 'GRAPH_MODEL_PROP_TYPES_ROOT_KEY',
  GRAPH_MODEL_MARKDOWN_ROOT_KEY: 'GRAPH_MODEL_MARKDOWN_ROOT_KEY',
  GRAPH_MODEL_CLIPBOARD_ROOT_KEY: 'GRAPH_MODEL_CLIPBOARD_ROOT_KEY',
  GRAPH_MODEL_TEMPLATES_ROOT_KEY: 'GRAPH_MODEL_TEMPLATES_ROOT_KEY',

  MARKET_PUBLISH_COMPONENT_PACKAGE_TYPE: 'MARKET_PUBLISH_COMPONENT_PACKAGE_TYPE',
  MARKET_PUBLISH_FUNCTIONS_PACKAGE_TYPE: 'MARKET_PUBLISH_FUNCTIONS_PACKAGE_TYPE',

  MARKET_PROJECT_TYPE: 'MARKET_PROJECT_TYPE',

  // Used for quick access to the needed resource branch in the resource graph.
  // When this values are changed, change the DIR_NAME_* values too in constants accordingly.
  GRAPH_MODEL_DIR_APP_INDICES_KEY: 'app/indices',
  GRAPH_MODEL_DIR_ETC_PAGES_KEY: 'etc/pages',
  GRAPH_MODEL_DIR_ETC_TEMPLATES_KEY: 'etc/templates',
  GRAPH_MODEL_DIR_ETC_FLOWS_KEY: 'etc/flows',
  GRAPH_MODEL_DIR_USR_KEY: 'usr',

  GRAPH_MODEL_FLOWS_ROOT_TYPE: 'GRAPH_MODEL_FLOWS_ROOT_TYPE',
  GRAPH_MODEL_PAGES_ROOT_TYPE: 'GRAPH_MODEL_PAGES_ROOT_TYPE',
  GRAPH_MODEL_COMPONENTS_ROOT_TYPE: 'GRAPH_MODEL_COMPONENTS_ROOT_TYPE',
  GRAPH_MODEL_USER_FUNCTIONS_ROOT_TYPE: 'GRAPH_MODEL_USER_FUNCTIONS_ROOT_TYPE',
  GRAPH_MODEL_PROP_TYPES_ROOT_TYPE: 'GRAPH_MODEL_PROP_TYPES_ROOT_TYPE',
  GRAPH_MODEL_MARKDOWN_ROOT_TYPE: 'GRAPH_MODEL_MARKDOWN_ROOT_TYPE',
  GRAPH_MODEL_CLIPBOARD_ROOT_TYPE: 'GRAPH_MODEL_CLIPBOARD_ROOT_TYPE',
  GRAPH_MODEL_TEMPLATES_ROOT_TYPE: 'GRAPH_MODEL_TEMPLATES_ROOT_TYPE',

  GRAPH_MODEL_DIR_TYPE: 'GRAPH_MODEL_DIR_TYPE',
  GRAPH_MODEL_FILE_TYPE: 'GRAPH_MODEL_FILE_TYPE',
  GRAPH_MODEL_COMPONENT_TYPE: 'GRAPH_MODEL_COMPONENT_TYPE',
  GRAPH_MODEL_COMPONENT_INSTANCE_TYPE: 'GRAPH_MODEL_COMPONENT_INSTANCE_TYPE',
  GRAPH_MODEL_FUNCTIONS_TYPE: 'GRAPH_MODEL_FUNCTIONS_TYPE',
  GRAPH_MODEL_USER_FUNCTION_TYPE: 'GRAPH_MODEL_USER_FUNCTION_TYPE',
  GRAPH_MODEL_PAGE_TYPE: 'GRAPH_MODEL_PAGE_TYPE',
  GRAPH_MODEL_TEMPLATE_TYPE: 'GRAPH_MODEL_TEMPLATE_TYPE',
  GRAPH_MODEL_PROP_TYPES_TYPE: 'GRAPH_MODEL_PROP_TYPES_TYPE',
  GRAPH_MODEL_MARKDOWN_TYPE: 'GRAPH_MODEL_MARKDOWN_TYPE',
  GRAPH_MODEL_CLIPBOARD_ITEM_TYPE: 'GRAPH_MODEL_CLIPBOARD_ITEM_TYPE',

  COMPONENT_PROPERTY_FUNCTION_TYPE: 'COMPONENT_PROPERTY_FUNCTION_TYPE',
  COMPONENT_PROPERTY_OBJECT_TYPE: 'COMPONENT_PROPERTY_OBJECT_TYPE',
  COMPONENT_PROPERTY_ELEMENT_TYPE: 'COMPONENT_PROPERTY_ELEMENT_TYPE',
  COMPONENT_PROPERTY_ANY_TYPE: 'COMPONENT_PROPERTY_ANY_TYPE',
  COMPONENT_PROPERTY_ARRAY_TYPE: 'COMPONENT_PROPERTY_ARRAY_TYPE',
  COMPONENT_PROPERTY_BOOL_TYPE: 'COMPONENT_PROPERTY_BOOL_TYPE',
  COMPONENT_PROPERTY_NUMBER_TYPE: 'COMPONENT_PROPERTY_NUMBER_TYPE',
  COMPONENT_PROPERTY_STRING_TYPE: 'COMPONENT_PROPERTY_STRING_TYPE',
  COMPONENT_PROPERTY_SYMBOL_TYPE: 'COMPONENT_PROPERTY_SYMBOL_TYPE',
  COMPONENT_PROPERTY_SHAPE_TYPE: 'COMPONENT_PROPERTY_SHAPE_TYPE',
  COMPONENT_PROPERTY_ARRAY_OF_TYPE: 'COMPONENT_PROPERTY_ARRAY_OF_TYPE',
  COMPONENT_PROPERTY_ONE_OF_TYPE: 'COMPONENT_PROPERTY_ONE_OF_TYPE',

  ANNOTATION_COMMENT: 'annotationComment',
  ANNOTATION_LABEL: 'annotationLabel',
  ANNOTATION_FUNCTION_ARGUMENT_PROP_TYPES: 'annotationFunctionArgumentPropTypes',

  GRAPH_MODEL_FLOW_TYPE: 'GRAPH_MODEL_FLOW_TYPE',
  GRAPH_MODEL_FLOW_COMPONENT_INSTANCE_TYPE: 'GRAPH_MODEL_FLOW_COMPONENT_INSTANCE_TYPE',
  GRAPH_MODEL_FLOW_USER_FUNCTION_TYPE: 'GRAPH_MODEL_FLOW_USER_FUNCTION_TYPE',
  GRAPH_MODEL_FLOW_PAGE_TYPE: 'GRAPH_MODEL_FLOW_PAGE_TYPE',

  // do not chane values - they are used in flow etc files
  FLOW_APPLICATION_STARTER_TYPE: 'flowApplicationStarter',
  FLOW_PAGE_TYPE: 'flowPageType',
  FLOW_USER_FUNCTION_TYPE: 'flowUserFunction',
  FLOW_COMPONENT_INSTANCE_TYPE: 'flowComponentInstance',
  FLOW_PAGE_IN_BASKET_TYPE: 'flowPageInBasketType',
  FLOW_USER_FUNCTION_IN_BASKET_TYPE: 'flowUserFunctionInBasket',
  FLOW_COMPONENT_INSTANCE_IN_BASKET_TYPE: 'flowComponentInstanceInBasket',

  // do not chane values - they are used in flow etc files
  PAGE_COMPONENT_TYPE: 'PAGE_COMPONENT_TYPE',
  // PAGE_PLACEHOLDER_TYPE: 'pagePlaceholder',

  RESOURCE_EDITOR_TAB_LIVE_PREVIEW_TYPE: 'RESOURCE_EDITOR_TAB_LIVE_PREVIEW_TYPE',
  RESOURCE_EDITOR_TAB_README_PREVIEW_TYPE: 'RESOURCE_EDITOR_TAB_README_PREVIEW_TYPE',

  RESOURCE_LIVE_PREVIEW_KEY: 'RESOURCE_LIVE_PREVIEW_KEY',
  RESOURCE_README_PREVIEW_KEY: 'RESOURCE_README_PREVIEW_KEY',

  CONTEXT_MENU_FOR_RESOURCE_OBJECT: 'CONTEXT_MENU_FOR_RESOURCE_OBJECT',

  // do not change values - they are used in indices generator for file names
  INDEX_COMPONENTS_ROOT_FILE_NAME: 'userComponents',
  INDEX_USER_FUNCTIONS_ROOT_FILE_NAME: 'userFunctions',

  FRAMEWORK_MESSAGE_PAGE_CELL_WAS_SELECTED: 'FRAMEWORK_MESSAGE_PAGE_CELL_WAS_SELECTED',
  FRAMEWORK_MESSAGE_CONTEXT_MENU_CLICKED: 'FRAMEWORK_MESSAGE_CONTEXT_MENU_CLICKED',
  FRAMEWORK_MESSAGE_COMPONENT_ITEM_WAS_DROPPED: 'FRAMEWORK_MESSAGE_COMPONENT_ITEM_WAS_DROPPED',
  FRAMEWORK_MESSAGE_COMPONENT_EVENT: 'FRAMEWORK_MESSAGE_COMPONENT_EVENT',

  FRAMEWORK_MESSAGE_UNDO: 'FRAMEWORK_MESSAGE_UNDO',
  FRAMEWORK_MESSAGE_COPY: 'FRAMEWORK_MESSAGE_COPY',
  FRAMEWORK_MESSAGE_PASTE: 'FRAMEWORK_MESSAGE_PASTE',
  FRAMEWORK_MESSAGE_CUT: 'FRAMEWORK_MESSAGE_CUT',
  FRAMEWORK_MESSAGE_SAVE: 'FRAMEWORK_MESSAGE_SAVE',
  FRAMEWORK_MESSAGE_RELOAD: 'FRAMEWORK_MESSAGE_RELOAD',
  FRAMEWORK_MESSAGE_DELETE: 'FRAMEWORK_MESSAGE_DELETE',

  FRAMEWORK_MESSAGE_INIT_DEBUG: 'FRAMEWORK_MESSAGE_INIT_DEBUG',
  FRAMEWORK_MESSAGE_DEBUG: 'FRAMEWORK_MESSAGE_DEBUG',

  FRAMEWORK_MESSAGE_CHANGE_URL: 'FRAMEWORK_MESSAGE_CHANGE_URL',

  FRAMEWORK_ACTION_SEQUENCE_COMPONENT_TYPE: 'component',
  FRAMEWORK_ACTION_SEQUENCE_PAGE_TYPE: 'page',
  FRAMEWORK_ACTION_SEQUENCE_USER_FUNCTION_TYPE: 'userFunction',
  FRAMEWORK_ACTION_SEQUENCE_DISPATCH_ERROR_TYPE: 'caughtException',

  WEBCODESK_MESSAGE_START_LISTENING_TO_FRAMEWORK: 'WEBCODESK_MESSAGE_START_LISTENING_TO_FRAMEWORK',
  WEBCODESK_MESSAGE_STOP_LISTENING_TO_FRAMEWORK: 'WEBCODESK_MESSAGE_STOP_LISTENING_TO_FRAMEWORK',
  WEBCODESK_MESSAGE_COMPONENT_RESOURCE_INDEX: 'WEBCODESK_MESSAGE_COMPONENT_RESOURCE_INDEX',
  WEBCODESK_MESSAGE_COMPONENT_STORY_RESOURCE_INDEX: 'WEBCODESK_MESSAGE_COMPONENT_STORY_RESOURCE_INDEX',
  WEBCODESK_MESSAGE_UPDATE_PAGE_COMPONENTS_TREE: 'WEBCODESK_MESSAGE_UPDATE_PAGE_COMPONENTS_TREE',
  WEBCODESK_MESSAGE_DELETE_PAGE_COMPONENT: 'WEBCODESK_MESSAGE_DELETE_PAGE_COMPONENT',
  WEBCODESK_MESSAGE_COMPONENT_ITEM_DRAG_START: 'WEBCODESK_MESSAGE_COMPONENT_ITEM_DRAG_START',
  WEBCODESK_MESSAGE_COMPONENT_ITEM_DRAG_END: 'WEBCODESK_MESSAGE_COMPONENT_ITEM_DRAG_END',
  WEBCODESK_MESSAGE_COMPONENT_ITEM_DRAG_MOVE: 'WEBCODESK_MESSAGE_COMPONENT_ITEM_DRAG_MOVE',

  MEDIA_WIDTHS: [
    {
      label: 'Auto, 100%',
      iconType: 'SettingsOverscan', // Auto
      width: '100%',
    },
    {
      label: 'Handset, 0-359 (4 columns)',
      iconType: 'StayCurrentPortrait', // Phone Portrait
      width: '359px',
    },
    {
      label: 'Handset, 360-399 (4 columns)',
      iconType: 'StayCurrentPortrait', // Phone Portrait
      width: '399px',
    },
    {
      label: 'Handset, 400-479 (4 columns)',
      iconType: 'StayCurrentPortrait', // Phone Portrait
      width: '479px',
    },
    {
      label: 'Handset, 480-599 (4 columns)',
      iconType: 'StayCurrentPortrait', // Phone Landscape
      width: '599px',
    },
    {
      label: 'Handset, 600-719 (8 columns)',
      iconType: 'StayCurrentLandscape', // Phone Landscape
      width: '719px',
    },
    {
      label: 'Handset, 720-839 (8 columns)',
      iconType: 'StayCurrentLandscape', // Phone Landscape
      width: '839px',
    },
    {
      label: 'Handset, 840-959 (12 columns)',
      iconType: 'StayCurrentLandscape', // Phone Landscape
      width: '959px',
    },
    {
      label: 'Tablet, 600-719 (8 columns)',
      iconType: 'StayCurrentPortrait', // Tablet Portrait
      width: '719px',
    },
    {
      label: 'Tablet, 720-839 (8 columns)',
      iconType: 'StayCurrentPortrait', // Tablet Portrait
      width: '839px',
    },
    {
      label: 'Tablet, 840-959 (12 columns)',
      iconType: 'StayCurrentPortrait', // Tablet Portrait
      width: '959px',
    },
    {
      label: 'Tablet, 960-1023 (12 columns)',
      iconType: 'StayCurrentLandscape', // Tablet Landscape
      width: '1023px',
    },
    {
      label: 'Tablet, 1024-1279 (12 columns)',
      iconType: 'StayCurrentLandscape', // Tablet Landscape
      width: '1279px',
    },
    {
      label: 'Tablet, 1280-1439 (12 columns)',
      iconType: 'StayCurrentLandscape', // Tablet Landscape
      width: '1439px',
    },
    {
      label: 'Desktop, 1440-1599 (12 columns)',
      iconType: 'DesktopMac', // Desktop
      width: '1599px',
    },
    {
      label: 'Desktop, 1600-1919 (12 columns)',
      iconType: 'DesktopMac', // Desktop
      width: '1919px',
    },
    {
      label: 'Desktop, 1920+ (12 columns)',
      iconType: 'DesktopMac', // Desktop
      width: '1200px',
    },
  ],

  // do not change values - they are used in the framework
  DEBUG_MSG_APPLICATION_START_EVENT: 'onApplicationStart',
  DEBUG_MSG_COMPONENT_FIRE_EVENT: 'fireComponentEvent',
  DEBUG_MSG_FUNCTION_FIRE_EVENT: 'fireFunctionEvent',
  DEBUG_MSG_FUNCTION_CALL_EVENT: 'callFunction',
  DEBUG_MSG_REDUCE_DATA_EVENT: 'reduceData',
  DEBUG_MSG_NEW_PROPS_EVENT: 'receiveNewProps',
  DEBUG_MSG_FORWARD_EVENT: 'forwardToPath',
  DEBUG_MSG_CREATE_CONTAINER_EVENT: 'createContainer',

  PROJECT_SETTINGS_DEFAULTS: {
    port: 3030,
  },

  COMPILER_ERROR_PROPERTY_NOT_FOUND: 'COMPILER_ERROR_PROPERTY_NOT_FOUND',
  COMPILER_ERROR_PROPERTY_REPLACED: 'COMPILER_ERROR_PROPERTY_REPLACED',
  COMPILER_ERROR_COMPONENT_NOT_FOUND: 'COMPILER_ERROR_COMPONENT_NOT_FOUND',
  COMPILER_ERROR_USER_FUNCTION_NOT_FOUND: 'COMPILER_ERROR_USER_FUNCTION_NOT_FOUND',
  COMPILER_ERROR_PAGE_NOT_FOUND: 'COMPILER_ERROR_PAGE_NOT_FOUND',
  COMPILER_ERROR_INSTANCE_HAS_PROPERTIES_ERRORS: 'COMPILER_ERROR_INSTANCE_HAS_PROPERTIES_ERRORS',
  COMPILER_ERROR_FLOW_ELEMENT_EMPTY_PROPERTIES: 'COMPILER_ERROR_FLOW_ELEMENT_EMPTY_PROPERTIES',
  COMPILER_ERROR_INSTANCE_NOT_FOUND: 'COMPILER_ERROR_INSTANCE_NOT_FOUND',
  COMPILER_ERROR_NO_INPUT_CONNECTIONS: 'COMPILER_ERROR_NO_INPUT_CONNECTIONS',

};
