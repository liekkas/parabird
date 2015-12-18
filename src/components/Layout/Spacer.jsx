import React from 'react';

const propTypes = {
  'foo': React.PropTypes.string.isRequired,
};

const defaultProps = {
  'width': '100%',
  'height': '100%',
};

class Spacer extends React.Component {
  render() {
    const style = {
      width: '100px',
    }
    return (
      <div style={style}/>
    );
  }
}

Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;
