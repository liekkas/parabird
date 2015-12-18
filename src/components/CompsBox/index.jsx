/**
 * 组件库
 */
import React from 'react';
import { RaisedButton } from 'material-ui';

const propTypes = {
  'foo': React.PropTypes.string.isRequired,
};

const defaultProps = {
  'foo': '',
};

class CompsBox extends React.Component {
  render() {
    return (
      <RaisedButton label="托" primary={true}/>
    );
  }
}

CompsBox.propTypes = propTypes;
CompsBox.defaultProps = defaultProps;

export default CompsBox;
