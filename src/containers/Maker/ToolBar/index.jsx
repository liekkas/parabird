import React, { PropTypes } from 'react';
import { Checkbox, RaisedButton, DropDownMenu, MenuItem } from 'material-ui';
import logo from './logo.png';
import style from './style.scss';
import { themes, screenRatios, screenNums } from '../../../constants/Consts';
import { BASE_URL } from '../../../config';

class ToolBar extends React.Component {

  render() {
    const { onThemeChanged, curScene, theme, onScreenRatioChanged, onScreenNumChanged,
      onNewScene, onSaveScene, onScenesMgr, onPreviewScene } = this.props;

    return (
      <div className={style.full}>
        <div className={style.left}>
          <image src={logo} className={style.round}
                 onClick={() => window.open(BASE_URL + '#/shownav')}/>
          <div style={{ width: '2vh' }}/>
          <label>Screen Show</label>
        </div>

        <div className={style.title}>
          <h4>{curScene.name}</h4>
          <h6>{curScene.state === 'saved' ? '编辑中...' : '新建中...'}</h6>
        </div>

        <div className={style.right}>
          <RaisedButton label="新建" primary={true} onClick={onNewScene}/>
          <RaisedButton label="保存" primary={true} onClick={onSaveScene}/>
          <RaisedButton label="场景管理" primary={true} onClick={onScenesMgr}/>
          <RaisedButton label="预览" primary={true} onClick={onPreviewScene}/>
          <DropDownMenu value={theme} labelStyle={{color: '#FFF'}}
                        onChange={onThemeChanged}>
            { themes }
          </DropDownMenu>
        </div>
      </div>
    );
  }
}

ToolBar.propTypes = {
  curScene: PropTypes.object,
  theme: PropTypes.string.isRequired,
  onThemeChanged: PropTypes.func.isRequired,
  onScreenRatioChanged: PropTypes.func.isRequired,
  onScreenNumChanged: PropTypes.func.isRequired,
  onSaveScene: PropTypes.func.isRequired,
  onNewScene: PropTypes.func.isRequired,
  onScenesMgr: PropTypes.func.isRequired,
  onPreviewScene: PropTypes.func.isRequired,
};

export default ToolBar;
