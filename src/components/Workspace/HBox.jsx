import React, { PropTypes } from 'react';

class HBox extends React.Component {
  render() {
    const { w, h } = this.props;
    return (
      <div style={{
        width: w,
        height: h,
        display: 'flex',
        flexDirection: 'row',
        //flexWrap: 'wrap',
        border: 'none',
      }}>
        {this.props.children}
      </div>
    );
  }
}

HBox.propTypes = {
  w: PropTypes.string.isRequired,
  h: PropTypes.string.isRequired,
};
HBox.defaultProps = {
  w: '100%',
  h: '100%',
};

export default HBox;
