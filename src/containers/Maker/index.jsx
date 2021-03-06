/**
 * 定制主界面
 * @author liekkas
 */
import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import { Colors } from 'material-ui/lib/styles';

import _ from 'lodash';
import CompsBox from './CompsBox';
import ToolBar from './ToolBar';
import Workspace from './Workspace';
import Showspace from '../Shower/Showspace';
import ScenesMgr from './ScenesMgr';
import style from './style.scss';
import { connect } from 'react-redux';
import { createAction, ActionTypes } from '../../actions';

import { getThemeByName } from '../../tools/styleTools';
import * as actionCreators from '../../actions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { saveParabird, updateParabird } from '../../services';
import SaveWindow from './SaveWindow';

const Maker = React.createClass({

  /*contextTypes: {
    muiTheme: React.PropTypes.object,
    theme: React.PropTypes.string,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    theme: React.PropTypes.string,
  },*/

  getInitialState() {
    //const { muiTheme } = getThemeByName(this.props.theme);
    return {
      //muiTheme: muiTheme,
      theme: this.props.theme,
      screenRatio: this.props.screenRatio,
      screenNums: this.props.screenNums,
      openPreview: false,
      openSave: false,
      openScenesMgr: false,
    };
  },

  /*getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      theme: this.state.theme,
    };
  },*/

  componentWillReceiveProps(nextProps, nextState) {
    //console.log('>>> Maker:WillReceiveRrops:', nextProps, nextState);
    const { needSave, user, curScene, scenes } = nextProps;
    //const { muiTheme } = getThemeByName(nextProps.theme);
    this.setState({ 'theme': nextProps.theme });
    this.setState({ 'screenRatio': nextProps.screenRatio });
    this.setState({ 'screenNums': nextProps.screenNums });
    //this.setState({ 'muiTheme': muiTheme });

    //console.log('>>> Maker:WillReceiveRrops', needSave);
    if (needSave) {
      user.configed
        ? updateParabird('root', { curScene, scenes }, this.props.dispatch)
        : saveParabird('root', { curScene, scenes }, this.props.dispatch)
    }
  },

  onThemeChanged(event, index, value) {
    this.props.dispatch(createAction(ActionTypes.THEME_CHANGED, value));
  },

  onScreenRatioChanged(event, selectedIndex, menuItem) {
    this.props.dispatch(createAction(ActionTypes.SCREEN_RATIO_CHANGED, menuItem.payload));
  },

  onScreenNumChanged(event, selectedIndex, menuItem) {
    this.props.dispatch(createAction(ActionTypes.SCREEN_NUMS_CHANGED, menuItem.payload));
  },

  onNewScene() {
    this.props.dispatch(createAction(ActionTypes.NEW_SCENE, this.props.user.name));
  },

  //两处需要保存,当前curScene的,以及scenes里的状态
  onSaveScene(payload) {
    this.handleSaveWindowOpen();
  },

  onScenesMgr() {
    this.setState({ openScenesMgr: true });
  },

  onPreviewScene() {
    //this.props.dispatch(createAction(ActionTypes.PREVIEW_UNSAVED_SCENE));
    this.setState({ openPreview: true });
  },

  onDropPlacerOnWorkspace(payload) {
    this.props.dispatch(createAction(ActionTypes.DRAG_PLACER_ON_WORKSPACE, payload));
  },

  onDropComponentIntoWorkspace(payload) {
    this.props.dispatch(createAction(ActionTypes.DRAG_COMPONENT_INTO_WORKSPACE, payload));
  },

  onRemovePlacer(payload) {
    this.props.dispatch(createAction(ActionTypes.REMOVE_PLACER_FROM_WORKSPACE, payload));
  },

  onConfigPlacer(payload) {
    this.props.dispatch(createAction(ActionTypes.SAVE_COMPONENT_CONFIG, payload));
  },

  onFocusPlacer(payload) {
    this.props.dispatch(createAction(ActionTypes.BRING_PLACER_TO_FRONT, payload));
  },

  handleOpen() {
    this.setState({ openPreview: true });
  },

  handleClose() {
    this.setState({ openPreview: false });
  },

  handleSaveWindowOpen() {
    this.setState({ openSave: true });
  },
  handleSaveWindowClose() {
    this.setState({ openSave: false });
  },

  handleSave(config) {
    //console.log('>>> Marker:handleSave', config);
    const { dispatch, user, curScene, scenes } = this.props;
    if (curScene.state === 'unsaved') {
      curScene.createDate = config.updateDate;
      curScene.createUser = user.name;
    }
    dispatch(createAction(ActionTypes.SAVE_SCENE, _.merge(curScene, config)));
    this.handleSaveWindowClose();
  },

  _handleSceneMgrGroups() {
    const { groups, entries } = this.props.scenes;
    const result = [];
    const count = _.countBy(entries, 'group');
    _.forEach(groups, function (item) {
      result.push({ name: item.name, num: count.hasOwnProperty([item.name]) ? count[item.name] : 0 });
    });
    return result;
  },

  _handleSceneEdit(scene) {
    this.props.dispatch(createAction(ActionTypes.EDIT_SCENE, scene));
  },

  _handleSceneDelete(sceneId) {
    this.props.dispatch(createAction(ActionTypes.DELETE_SCENE, sceneId));
  },

  _handleGroupDelete(groupName) {
    this.props.dispatch(createAction(ActionTypes.DELETE_GROUP, groupName));
  },

  render() {
    const commonStyle = getThemeByName(this.state.theme).common;
    //const headerBG = { 'background': appTheme.toolbarBgColor };
    //const compsBoxBG = { 'background': appTheme.compsBoxBgColor };
    //const workspaceBG = { 'background': appTheme.workspaceBgColor };
    const { curScene, scenes, user, theme } = this.props;

    return (
      <div className={style.myroot}>
        <div className={style.header}>
          <ToolBar curScene={curScene}
                   theme={theme}
                   onThemeChanged={this.onThemeChanged}
                   onScreenRatioChanged={this.onScreenRatioChanged}
                   onScreenNumChanged={this.onScreenNumChanged}
                   onNewScene={this.onNewScene}
                   onSaveScene={this.onSaveScene}
                   onScenesMgr={this.onScenesMgr}
                   onPreviewScene={this.onPreviewScene}/>
        </div>
        <div className={style.hbox}>
          <div className={style.sidebar}>
            <CompsBox />
          </div>
          <div className={style.workspace} style={commonStyle.sceneBg}>
            <Workspace placers={curScene.placers}
                       theme={theme}
                       screenRatio={this.state.screenRatio}
                       screenNums={this.state.screenNums}
                       dropPlacerOnWorkspace={ payload => this.onDropPlacerOnWorkspace(payload)}
                       dropComponentIntoWorkspace={ payload => this.onDropComponentIntoWorkspace(payload)}
                       onRemovePlacer={ payload => this.onRemovePlacer(payload) }
                       onConfigPlacer={ payload => this.onConfigPlacer(payload) }
                       onFocusPlacer={ payload => this.onFocusPlacer(payload) }/>
          </div>
        </div>

        { this.state.openPreview ? <Showspace isPreview={true}
                                       scene={curScene}
                                       onClosePreView={this.handleClose} /> : null
        }

        {
          this.state.openScenesMgr ? <ScenesMgr
            user={user}
            groups={this._handleSceneMgrGroups()}
            entries={scenes.entries}
            onSceneEdit={(scene) => this._handleSceneEdit(scene)}
            onSceneDelete={(sceneId) => this._handleSceneDelete(sceneId)}
            onGroupDelete={(groupName) => this._handleGroupDelete(groupName)}
            onScenesMgrClose={() => this.setState({ openScenesMgr: false })} /> : null
        }

        {
          this.state.openSave ? <Dialog
            title="保存"
            titleStyle={{
              backgroundColor: Colors.teal100
            }}
            bodyStyle={{
              backgroundColor: Colors.teal100
            }}
            modal={true}
            open={this.state.openSave}
            onRequestClose={this.handleSaveWindowClose}>
            <SaveWindow name={curScene.name}
                        desc={curScene.desc}
                        group={curScene.group}
                        groups={_.pluck(this.props.scenes.groups, 'name')}
                        cover={curScene.cover}
                        onCancel={this.handleSaveWindowClose}
                        onSave={ (config) => this.handleSave(config) }/>
          </Dialog> : null
        }
      </div>
    );
  }
});

Maker.propTypes = {
  theme: React.PropTypes.string.isRequired,
  screenRatio: React.PropTypes.string.isRequired,
  screenNums: React.PropTypes.string.isRequired,
  needSave: React.PropTypes.bool.isRequired,
  curScene: React.PropTypes.object,
  scenes: React.PropTypes.object,
  user: React.PropTypes.object,
};

Maker.defaultProps = {
  theme: 'TealTheme',
};

function select(state) {
  //console.log('>>> Maker:Selector', state.get('global'), state.get('curScene'));
  return {
    theme: state.getIn(['global', 'theme']),
    screenRatio: state.getIn(['global', 'screenRatio']),
    screenNums: state.getIn(['global', 'screenNums']),
    user: state.getIn(['global', 'user']).toJS(),
    needSave: state.getIn(['global', 'needSave']),
    curScene: state.get('curScene').toJS(),
    scenes: state.get('scenes').toJS(),
  };
}

export default DragDropContext(HTML5Backend)(connect(select)(Maker));
