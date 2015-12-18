import React from 'react';

const propTypes = {
  'foo': React.PropTypes.string.isRequired,
};

const defaultProps = {
  'foo': '',
};

class ShowNav extends React.Component {
  render() {
    return (
      <div>
        导航吗?
      </div>
    );
  }
}

ShowNav.propTypes = propTypes;
ShowNav.defaultProps = defaultProps;

export default ShowNav;
