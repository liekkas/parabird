import React, { PropTypes } from 'react';

class VBox extends React.Component {
  render() {
    const { w, h } = this.props;
    return (
      <div style={{
        width: w,
        height: h,
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
      }}>
        {this.props.children}
      </div>
    );
  }
}

VBox.propTypes = {
  w: PropTypes.string.isRequired,
  h: PropTypes.string.isRequired,
};
VBox.defaultProps = {
  w: '100%',
  h: '100%',
};

export default VBox;
