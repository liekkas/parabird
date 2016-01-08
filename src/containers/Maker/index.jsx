/**
 * 定制主界面
 * @author liekkas
 */
import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import _ from 'lodash';
import CompsBox from './CompsBox';
import ToolBar from './ToolBar';
import Workspace from './Workspace';
import Showspace from '../Shower/Showspace';
import Home from '../Home/Home';
import style from './style.scss';
import { connect } from 'react-redux';
import { createAction } from '../../actions';
import { GlobalActionTypes, CurSceneActionTypes, ScenesActionTypes } from '../../constants/ActionTypes';

import { getThemeByName } from '../../tools/styleTools';
import * as actionCreators from '../../actions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { saveParabird, updateParabird } from '../../services';
import SaveWindow from './SaveWindow';

const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    padding: '0',
    border: 'none',
  }
};

const Maker = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object,
    theme: React.PropTypes.string,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    theme: React.PropTypes.string,
  },

  getInitialState() {
    const { muiTheme } = getThemeByName(this.props.themeP);
    return {
      muiTheme: muiTheme,
      theme: this.props.themeP,
      screenRatio: this.props.screenRatio,
      screenNums: this.props.screenNums,
      open: false,
      openSave: false,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      theme: this.state.theme,
    };
  },

  componentWillReceiveProps(nextProps, nextState) {
    //console.log('>>> Maker:WillReceiveRrops:', nextProps, nextState);
    const { needSave, user, curScene, scenes } = nextProps;
    const { muiTheme } = getThemeByName(nextProps.themeP);
    this.setState({ 'theme': nextProps.themeP });
    this.setState({ 'screenRatio': nextProps.screenRatio });
    this.setState({ 'screenNums': nextProps.screenNums });
    this.setState({ 'muiTheme': muiTheme });

    console.log('>>> Maker:WillReceiveRrops', needSave);
    if (needSave) {
      user.get('configed') ?
        updateParabird('root', { curScene, scenes }, this.props.dispatch) :
        saveParabird('root', { curScene, scenes }, this.props.dispatch);
    }
  },

  onThemeChanged(event, index, value) {
    this.props.dispatch(createAction(GlobalActionTypes.THEME_CHANGED, value));
  },

  onScreenRatioChanged(event, selectedIndex, menuItem) {
    this.props.dispatch(createAction(GlobalActionTypes.SCREEN_RATIO_CHANGED, menuItem.payload));
  },

  onScreenNumChanged(event, selectedIndex, menuItem) {
    this.props.dispatch(createAction(GlobalActionTypes.SCREEN_NUMS_CHANGED, menuItem.payload));
  },

  onNewScene() {
    this.props.dispatch(createAction(CurSceneActionTypes.NEW_SCENE, this.props.user.get('name')));
  },

  //两处需要保存,当前curScene的,以及scenes里的状态
  onSaveScene(payload) {
    this.handleSaveWindowOpen();
  },

  onPreviewScene() {
    //this.props.dispatch(createAction(CurSceneActionTypes.PREVIEW_UNSAVED_SCENE));
    this.setState({ open: true });
  },

  onDropPlacerOnWorkspace(payload) {
    this.props.dispatch(createAction(CurSceneActionTypes.DRAG_PLACER_ON_WORKSPACE, payload));
  },

  onDropComponentIntoWorkspace(payload) {
    this.props.dispatch(createAction(CurSceneActionTypes.DRAG_COMPONENT_INTO_WORKSPACE, payload));
  },

  onRemovePlacer(payload) {
    this.props.dispatch(createAction(CurSceneActionTypes.REMOVE_PLACER_FROM_WORKSPACE, payload));
  },

  onConfigPlacer(payload) {
    this.props.dispatch(createAction(CurSceneActionTypes.SAVE_COMPONENT_CONFIG, payload));
  },

  handleOpen() {
    this.setState({ open: true });
  },

  handleClose() {
    this.setState({ open: false });
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
    }
    dispatch(createAction(CurSceneActionTypes.SAVE_SCENE, _.merge(curScene, config)));
    this.handleSaveWindowClose();
  },

  render() {
    const appTheme = getThemeByName(this.state.theme).appTheme;
    const headerBG = { 'background': appTheme.toolbarBgColor };
    const compsBoxBG = { 'background': appTheme.compsBoxBgColor };
    const workspaceBG = { 'background': appTheme.workspaceBgColor };
    const { curScene } = this.props;

    return (
      <div className={style.myroot}>
        <div className={style.header} style={headerBG}>
          <ToolBar onThemeChanged={this.onThemeChanged}
                   onScreenRatioChanged={this.onScreenRatioChanged}
                   onScreenNumChanged={this.onScreenNumChanged}
                   onNewScene={this.onNewScene}
                   onSaveScene={this.onSaveScene}
                   onPreviewScene={this.onPreviewScene}/>
        </div>
        <div className={style.hbox}>
          <div className={style.sidebar} style={compsBoxBG}>
            <CompsBox />
          </div>
          <div className={style.workspace} style={workspaceBG}>
            <Workspace placers={curScene.placers}
                       screenRatio={this.state.screenRatio}
                       screenNums={this.state.screenNums}
                       dropPlacerOnWorkspace={ payload => this.onDropPlacerOnWorkspace(payload)}
                       dropComponentIntoWorkspace={ payload => this.onDropComponentIntoWorkspace(payload)}
                       onRemovePlacer={ payload => this.onRemovePlacer(payload) }
                       onConfigPlacer={ payload => this.onConfigPlacer(payload) }/>
          </div>
        </div>

        { this.state.open ? <Showspace isPreview={true}
                                       scene={curScene}
                                       bgColor={appTheme.workspaceBgColor}
                                       onClosePreView={this.handleClose} /> : null
        }

        {
          this.state.openSave ? <Dialog
            title="保存"
            style={{
            //width: '75%',
            //height: '50%',
            //left: '25%',
            }}
            modal={true}
            open={this.state.openSave}
            onRequestClose={this.handleSaveWindowClose}>
            <SaveWindow name={curScene.name}
                        desc={curScene.desc}
                        group={curScene.group}
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
  themeP: React.PropTypes.string.isRequired,
  screenRatio: React.PropTypes.string.isRequired,
  screenNums: React.PropTypes.string.isRequired,
  needSave: React.PropTypes.bool.isRequired,
  curScene: React.PropTypes.object,
  scenes: React.PropTypes.object,
  user: React.PropTypes.object,
};

Maker.defaultProps = {
  themeP: 'TealTheme',
};

function select(state) {
  //console.log('>>> Maker:Selector', state.get('global'), state.get('curScene'));
  return {
    themeP: state.getIn(['global', 'theme']),
    screenRatio: state.getIn(['global', 'screenRatio']),
    screenNums: state.getIn(['global', 'screenNums']),
    user: state.getIn(['global', 'user']),
    needSave: state.getIn(['global', 'needSave']),
    curScene: state.get('curScene').toJS(),
    scenes: state.get('scenes').toJS(),
  };
}

export default DragDropContext(HTML5Backend)(connect(select)(Maker));
