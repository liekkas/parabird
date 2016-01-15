import React, { PropTypes } from 'react';
import style from './style.scss';
import { TextField } from 'material-ui';
import {Motion, spring} from 'react-motion';

class PBText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
    };
  }

  render() {
    const { config } = this.props;
    return (
      <div className={style.root}>
        <div className={style.title}>{config.title}</div>
        <TextField multiLine={true} disabled={true}
                   hintText="请输入正文" fullWidth={true}
                   underlineDisabledStyle={{ visibility: 'hidden' }}
                   defaultValue={config.text}/>
      </div>
    );
  }
}

PBText.propTypes = {
  config: PropTypes.object.isRequired,
};
PBText.defaultProps = {
};

export default PBText;
/*

<Motion defaultStyle={{x: 0}}  style={{x: spring(80,[100,20])}}>
  {({x}) => <div style={{
            height: '80%',
            transform: `translate3d(0, ${x}%, 0)`,
          }}>
  </div>}
</Motion>*/
