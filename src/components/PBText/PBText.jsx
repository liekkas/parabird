import React, { PropTypes } from 'react';
import style from './style.scss';
import { TextField } from 'material-ui';
//import {Motion, spring} from 'react-motion';

class PBText extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.config.title !== nextProps.config.title
      || this.props.config.text !== nextProps.config.text);
  }

  render() {
    const { config } = this.props;
    return (
      <div className={style.root}>
        <div className={style.title}>{config.title}</div>
        <TextField multiLine={true} disabled={false}
                   hintText="请输入正文" fullWidth={true}
                   inputStyle={{ color: '#FF0000' }}
                   underlineDisabledStyle={{ visibility: 'hidden' }}
                   underlineStyle={{ visibility: 'hidden' }}
                   value={config.text}/>
      </div>
    );
  }
}

PBText.propTypes = {
  config: PropTypes.object.isRequired,
};

export default PBText;
