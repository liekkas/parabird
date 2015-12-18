import React, { PropTypes } from 'react';
import { RaisedButton, DropDownMenu } from 'material-ui';
import _ from 'lodash';
import logo from './logo.png';
import style from './style.scss';

class ToolBar extends React.Component {

  getThemeIndex() {
    return _.findIndex(this.props.themes, 'payload', this.context.theme);
  }

  render() {
    //console.log('此刻:', this.context.theme);
    const { themes, layouts, onThemeChanged } = this.props;

    return (
      <div className={style.full}>
        <div className={style.left}>
          <image src={logo} className={style.round}/>
          <div style={{ width: '2vh' }}/>
          <label>Screen Show</label>
        </div>

        <div className={style.right}>
          <RaisedButton label="保存" primary={true} />
          <RaisedButton label="场景列表" primary={true}/>
          <RaisedButton label="预览" primary={true}/>
          <DropDownMenu menuItems={layouts}/>
          <DropDownMenu menuItems={themes}
                        selectedIndex={this.getThemeIndex()}
                        onChange={onThemeChanged}/>
        </div>
      </div>
    );
  }
}

ToolBar.contextTypes = {
  theme: PropTypes.string,
};

ToolBar.propTypes = {
  onThemeChanged: PropTypes.func.isRequired,
};

ToolBar.defaultProps = {
  themes: [
    { payload: 'TealTheme', text: '主题:青葱少年' },
    { payload: 'RedTheme', text: '主题:红色风暴' },
    //{ payload: 'BlueTheme', text: '主题:深空蓝' },
  ],
  layouts: [
    { payload: 'layout22', text: '布局:2*2' },
    { payload: 'layout24', text: '布局:2*4' },
    { payload: 'layout46', text: '布局:4*6' },
  ],
};

export default ToolBar;
