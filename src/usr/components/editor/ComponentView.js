import isEqual from 'lodash/isEqual';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SplitPane from '../splitPane';
import constants from '../../../commons/constants';
import { CommonToolbar, CommonToolbarDivider, CommonTab, CommonTabs } from '../commons/Commons.parts';
import IFrame from './IFrame';
import ToolbarButton from '../commons/ToolbarButton';
import EventsLogViewer from './EventsLogViewer';
import SourceCodeEditor from '../commons/SourceCodeEditor';
import MarkdownView from '../commons/MarkdownView';
import PageComposerManager from '../../core/pageComposer/PageComposerManager';
import ComponentPropsTree from './ComponentPropsTree';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  editorPane: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'auto',
  },
  centralPane: {
    position: 'absolute',
    top: '39px',
    bottom: 0,
    right: 0,
    left: 0,
  },
  topPane: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '39px',
    right: 0,
    minWidth: '800px'
  },
  leftPane: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  tabContentPane: {
    position: 'absolute',
    top: '32px',
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'auto',
  },
});

class ComponentView extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    serverPort: PropTypes.number,
    isVisible: PropTypes.bool,
    onSaveChanges: PropTypes.func,
    onSaveAsTemplate: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    serverPort: -1,
    // sourceCode: '',
    isVisible: true,
    onSaveChanges: () => {
      console.info('ComponentView.onSaveChanges is not set');
    },
    onSaveAsTemplate: () => {
      console.info('ComponentView.onSaveAsTemplate is not set');
    },
  };

  constructor (props) {
    super(props);
    this.iFrameRef = React.createRef();
    const { data } = this.props;
    const componentsTree = data ? data.componentViewModel : {};
    this.pageComposerManager = new PageComposerManager(componentsTree, {});
    this.state = {
      activeListItemIndex: 0,
      iFrameReadyCounter: 0,
      sendMessageCounter: 0,
      showPanelCover: false,
      showPropertyEditor: true,
      showInfoView: true,
      infoTabActiveIndex: 0,
      iFrameWidth: 'auto',
      lastDebugMsg: null,
      isSourceCodeOpen: false,
      localComponentViewModel: null,
      localComponentsTree: this.pageComposerManager.getModel(),
      localSourceCode: '',
      markdownContent: data ? data.readmeText : '',
      sourceCodeUpdateCounter: 0,
      recentUpdateHistory: [],
    };
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { data, isVisible } = this.props;
    const {
      iFrameReadyCounter,
      sourceCodeUpdateCounter,
      sendMessageCounter,
      localComponentsTree,
      localComponentViewModel,
      isSourceCodeOpen
    } = this.state;
    if (prevProps.isVisible !== isVisible) {
      if (!isVisible && sourceCodeUpdateCounter > 0) {
        this.handleSaveChanges();
      }
    }
    if (iFrameReadyCounter > 0 && iFrameReadyCounter !== prevState.iFrameReadyCounter) {
      this.updateLocalState();
    } else if (data && data !== prevProps.data) {
      if (sourceCodeUpdateCounter === 0) {
        data.sourceCode.then(sourceCodeData => {
          this.setState({
            localSourceCode: sourceCodeData,
          });
        });
      }
      this.setState({
        markdownContent: data.readmeText || '',
      });
      const componentViewModel = data.componentViewModel || {};
      if (!isEqual(localComponentViewModel, componentViewModel)) {
        delete this.pageComposerManager;
        this.pageComposerManager = new PageComposerManager(componentViewModel, {});
        this.updateLocalState();
      }
    } else if (sendMessageCounter !== prevState.sendMessageCounter) {
      this.handleSendMessage({
        type: constants.WEBCODESK_MESSAGE_UPDATE_PAGE_COMPONENTS_TREE,
        payload: localComponentsTree
      });
    } else if (data && !prevState.isSourceCodeOpen && isSourceCodeOpen) {
      data.sourceCode.then(sourceCodeData => {
        this.setState({
          localSourceCode: sourceCodeData,
        });
      });
    }
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    const { data, isVisible, serverPort } = this.props;
    const {
      iFrameReadyCounter,
      sendMessageCounter,
      showPanelCover,
      showPropertyEditor,
      showInfoView,
      infoTabActiveIndex,
      iFrameWidth,
      lastDebugMsg,
      isSourceCodeOpen,
      sourceCodeUpdateCounter,
      localSourceCode,
      localComponentViewModel
    } = this.state;
    return iFrameReadyCounter !== nextState.iFrameReadyCounter
      || sendMessageCounter !== nextState.sendMessageCounter
      || showPanelCover !== nextState.showPanelCover
      || showPropertyEditor !== nextState.showPropertyEditor
      || showInfoView !== nextState.showInfoView
      || infoTabActiveIndex !== nextState.infoTabActiveIndex
      || iFrameWidth !== nextState.iFrameWidth
      || lastDebugMsg !== nextState.lastDebugMsg
      || isSourceCodeOpen !== nextState.isSourceCodeOpen
      || sourceCodeUpdateCounter !== nextState.sourceCodeUpdateCounter
      || localSourceCode !== nextState.localSourceCode
      || localComponentViewModel !== nextState.localComponentViewModel
      || data !== nextProps.data
      || serverPort !== nextProps.serverPort
      || isVisible !== nextProps.isVisible;
  }

  updateLocalState = () => {
    const {
      sendMessageCounter,
      recentUpdateHistory,
      localComponentsTree,
      localComponentViewModel
    } = this.state;
    const newRecentUpdateHistory =
      [
        ...recentUpdateHistory,
        {
          componentsTree: localComponentsTree,
          componentViewModel: localComponentViewModel,
        }
      ];
    const { data } = this.props;
    this.setState({
      sendMessageCounter: sendMessageCounter + 1,
      localComponentsTree: this.pageComposerManager.getModel(),
      localComponentViewModel: data ? data.componentViewModel : {},
      recentUpdateHistory: newRecentUpdateHistory,
    });
  };

  undoUpdateLocalState = () => {
    const {
      sendMessageCounter,
      recentUpdateHistory,
    } = this.state;
    const newRecentUpdateHistory = [...recentUpdateHistory];
    const lastRecentChanges = newRecentUpdateHistory.pop();
    if (lastRecentChanges) {
      delete this.pageComposerManager;
      this.pageComposerManager =
        new PageComposerManager(
          lastRecentChanges.componentsTree,
        );
      this.setState({
        sendMessageCounter: sendMessageCounter + 1,
        localComponentsTree: this.pageComposerManager.getModel(),
        localComponentViewModel: lastRecentChanges.componentViewModel,
        recentUpdateHistory: newRecentUpdateHistory,
      });
    }
  };

  handleIFrameReady = () => {
    this.setState({
      iFrameReadyCounter: this.state.iFrameReadyCounter + 1,
    });
  };

  handleSendMessage = (message) => {
    if (this.iFrameRef.current && this.state.iFrameReadyCounter > 0) {
      this.iFrameRef.current.sendMessage(message);
    }
  };

  handleFrameworkMessage = (message) => {
    if (message) {
      const { type, payload } = message;
      if (type === constants.FRAMEWORK_MESSAGE_COMPONENT_EVENT) {
        this.setState({
          lastDebugMsg: payload,
        });
      }
    }
  };

  handleReload = () => {
    this.iFrameRef.current.reloadPage();
  };

  handleTogglePropsPanel = () => {
    this.setState({
      showPropertyEditor: !this.state.showPropertyEditor,
    });
  };

  handleToggleInfoView = () => {
    this.setState({
      showInfoView: !this.state.showInfoView,
    });
  };

  handleSplitterOnDragStarted = () => {
    this.setState({
      showPanelCover: true,
    });
  };

  handleSplitterOnDragFinished = () => {
    this.setState({
      showPanelCover: false,
    });
  };

  handleChangeInfoTab = (event, value) => {
    this.setState({
      infoTabActiveIndex: value,
    });
  };

  handleToggleWidth = (width) => () => {
    this.setState({
      iFrameWidth: width,
    });
  };

  handleToggleSourceCode = () => {
    this.setState({
      isSourceCodeOpen: !this.state.isSourceCodeOpen,
    });
  };

  handleChangeSourceCode = ({script, hasErrors}) => {
    this.setState({
      localSourceCode: script,
      sourceCodeUpdateCounter: this.state.sourceCodeUpdateCounter + 1
    });
  };

  handleSaveChanges = () => {
    this.props.onSaveChanges(this.state.localSourceCode);
    this.setState({
      sourceCodeUpdateCounter: 0
    });
  };

  handleUpdateComponentProperty = (newComponentPropertyModel) => {
    if (newComponentPropertyModel) {
      this.pageComposerManager.updateComponentProperty(newComponentPropertyModel);
      this.updateLocalState();
    }
  };

  handleIncreaseComponentPropertyArray = (propertyKey) => {
    this.pageComposerManager.increaseComponentPropertyArray(propertyKey);
    this.updateLocalState();
  };

  handleDeleteComponentProperty = (propertyKey) => {
    this.pageComposerManager.deleteComponentProperty(propertyKey);
    this.updateLocalState();
  };

  handleSaveAsTemplate = () => {
    this.props.onSaveAsTemplate(this.state.localComponentsTree);
  };

  render () {
    const { classes, serverPort } = this.props;
    const {
      showPropertyEditor,
      showInfoView,
      showPanelCover,
      infoTabActiveIndex,
      lastDebugMsg,
      isSourceCodeOpen,
      localSourceCode,
      markdownContent,
      sourceCodeUpdateCounter,
      localComponentsTree,
      recentUpdateHistory
    } = this.state;
    const { iFrameWidth } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.topPane}>
          {!isSourceCodeOpen
            ? (
              <CommonToolbar disableGutters={true} dense="true">
                <ToolbarButton
                  iconType="LibraryBooks"
                  switchedOn={showInfoView}
                  onClick={this.handleToggleInfoView}
                  title="Readme"
                  tooltip={showInfoView
                    ? 'Close component readme and events log'
                    : 'Open component readme and events log'
                  }
                />
                <ToolbarButton
                  iconType="Edit"
                  switchedOn={showPropertyEditor}
                  onClick={this.handleTogglePropsPanel}
                  title="Properties"
                  tooltip={showPropertyEditor
                    ? 'Close component properties'
                    : 'Open component properties'
                  }
                />
                <CommonToolbarDivider/>
                <ToolbarButton
                  iconType="Undo"
                  title="Undo"
                  disabled={recentUpdateHistory.length === 0}
                  onClick={this.undoUpdateLocalState}
                  tooltip="Undo the last change of the property"
                />
                <ToolbarButton
                  iconType="Widgets"
                  title="Save Template"
                  onClick={this.handleSaveAsTemplate}
                  tooltip="Save the component with current settings as a template"
                />
                <CommonToolbarDivider/>
                <ToolbarButton
                  iconType="Edit"
                  title="Source Code"
                  onClick={this.handleToggleSourceCode}
                  tooltip="Switch to the source code editor"
                />
                <ToolbarButton
                  iconType="Refresh"
                  title="Reload"
                  onClick={this.handleReload}
                  tooltip="Reload the entire page"
                />
                <CommonToolbarDivider/>
                <ToolbarButton
                  iconType="SettingsOverscan"
                  switchedOn={iFrameWidth === constants.MEDIA_QUERY_WIDTH_AUTO_NAME}
                  onClick={this.handleToggleWidth(constants.MEDIA_QUERY_WIDTH_AUTO_NAME)}
                  tooltip="100% width viewport"
                />
                <ToolbarButton
                  iconType="DesktopMac"
                  switchedOn={iFrameWidth === constants.MEDIA_QUERY_WIDTH_DESKTOP_NAME}
                  onClick={this.handleToggleWidth(constants.MEDIA_QUERY_WIDTH_DESKTOP_NAME)}
                  tooltip="Desktop width viewport"
                />
                <ToolbarButton
                  iconType="TabletMac"
                  switchedOn={iFrameWidth === constants.MEDIA_QUERY_WIDTH_TABLET_NAME}
                  onClick={this.handleToggleWidth(constants.MEDIA_QUERY_WIDTH_TABLET_NAME)}
                  tooltip="Tablet width viewport"
                />
                <ToolbarButton
                  iconType="PhoneIphone"
                  switchedOn={iFrameWidth === constants.MEDIA_QUERY_WIDTH_MOBILE_NAME}
                  onClick={this.handleToggleWidth(constants.MEDIA_QUERY_WIDTH_MOBILE_NAME)}
                  tooltip="Mobile width viewport"
                />
              </CommonToolbar>
            )
            : (
              <CommonToolbar disableGutters={true} dense="true">
                <ToolbarButton
                  iconType="ArrowBack"
                  title="Component View"
                  onClick={this.handleToggleSourceCode}
                  tooltip="Switch to the component view"
                />
                <CommonToolbarDivider/>
                <ToolbarButton
                  iconType="Save"
                  iconColor="#4caf50"
                  title="Save Changes"
                  onClick={this.handleSaveChanges}
                  tooltip="Save recent changes"
                  switchedOn={sourceCodeUpdateCounter > 0}
                  disabled={sourceCodeUpdateCounter === 0}
                />
              </CommonToolbar>
            )
          }
        </div>
        <div className={classes.centralPane}>
          {!isSourceCodeOpen
            ? (
              <SplitPane
                key="storiesViewSplitter"
                split="vertical"
                primary="second"
                defaultSize={250}
                onDragStarted={this.handleSplitterOnDragStarted}
                onDragFinished={this.handleSplitterOnDragFinished}
                pane2Style={{ display: showPropertyEditor ? 'block' : 'none' }}
                resizerStyle={{ display: showPropertyEditor ? 'block' : 'none' }}
              >
                <div className={classes.leftPane}>
                  <SplitPane
                    key="actionsLogViewSplitter"
                    split="horizontal"
                    defaultSize={350}
                    primary="second"
                    onDragStarted={this.handleSplitterOnDragStarted}
                    onDragFinished={this.handleSplitterOnDragFinished}
                    pane2Style={{ display: showInfoView ? 'block' : 'none' }}
                    resizerStyle={{ display: showInfoView ? 'block' : 'none' }}
                  >
                    <div className={classes.root}>
                      {showPanelCover && (
                        <div className={classes.root} style={{ zIndex: 10 }}/>
                      )}
                      {serverPort > 0 && (
                        <IFrame
                          ref={this.iFrameRef}
                          width={iFrameWidth}
                          url={`http://localhost:${serverPort}/webcodesk__component_view`}
                          onIFrameReady={this.handleIFrameReady}
                          onDevToolClosedManually={this.handleDevToolsCloseManually}
                          onIFrameMessage={this.handleFrameworkMessage}
                        />
                      )}
                    </div>
                    <div className={classes.root}>
                      <CommonTabs
                        value={infoTabActiveIndex}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth={true}
                        onChange={this.handleChangeInfoTab}
                      >
                        <CommonTab label="Component Readme"/>
                        <CommonTab label="Events Log"/>
                      </CommonTabs>
                      {infoTabActiveIndex === 0 && (
                        <div className={classes.tabContentPane}>
                          <MarkdownView markdownContent={markdownContent} />
                        </div>
                      )}
                      {infoTabActiveIndex === 1 && (
                        <div className={classes.tabContentPane}>
                          <EventsLogViewer lastRecord={lastDebugMsg}/>
                        </div>
                      )}
                    </div>
                  </SplitPane>
                </div>
                <div className={classes.editorPane}>
                  <ComponentPropsTree
                    componentModel={localComponentsTree}
                    isSampleComponent={true}
                    onUpdateComponentPropertyModel={this.handleUpdateComponentProperty}
                    onIncreaseComponentPropertyArray={this.handleIncreaseComponentPropertyArray}
                    onDeleteComponentProperty={this.handleDeleteComponentProperty}
                  />
                </div>
              </SplitPane>
            )
            : (
              <SourceCodeEditor
                isVisible={true}
                data={{script: localSourceCode}}
                onChange={this.handleChangeSourceCode}
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ComponentView);