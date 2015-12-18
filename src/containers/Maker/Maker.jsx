import React from 'react';
import { CompsBox, ToolBar } from '../../components';
import Home from '../Home/Home';
import logo from './../../components/ToolBar/logo.png';
import style from './style.scss';
import { connect } from 'react-redux';
import { changeTheme } from '../../actions';
import { getThemeByName } from '../../tools/styleTools';

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
    const { muiTheme } = getThemeByName('TealTheme');
    return {
      muiTheme: muiTheme,
      theme: 'TealTheme',
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      theme: this.state.theme,
    };
  },

  onThemeChanged(event, selectedIndex, menuItem) {
    const { muiTheme } = getThemeByName(menuItem.payload);
    //console.log('>>> P apptheme:', appTheme.toolbarBgColor);
    this.setState({ 'muiTheme': muiTheme });
    this.setState({ 'theme': menuItem.payload });
  },

  render() {
    const appTheme = getThemeByName(this.state.theme).appTheme;
    const headerBG = { 'background': appTheme.toolbarBgColor };
    const compsBoxBG = { 'background': appTheme.compsBoxBgColor };
    const workspaceBG = { 'background': appTheme.workspaceBgColor };

    return (
      <div className={style.root}>
        <div className={style.header} style={headerBG}>
          <ToolBar onThemeChanged={this.onThemeChanged}/>
        </div>
        <div className={style.hbox}>
          <div className={style.sidebar} style={compsBoxBG}>
            <CompsBox />
          </div>
          <div className={style.workspace} style={workspaceBG}>
            <Home />
          </div>
        </div>
      </div>
    );
  }
});

Maker.propTypes = {
};
Maker.defaultProps = {
};

function select(state) {
  return {
    theme: state.payload,
  };
}

export default connect(select)(Maker);
