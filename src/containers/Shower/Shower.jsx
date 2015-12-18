import React from 'react';

const propTypes = {
  'foo': React.PropTypes.string.isRequired,
};

const defaultProps = {
  'foo': '',
};

class Shower extends React.Component {
  render() {
    return (
      <div>
        Show Me Sth
      </div>
    );
  }
}

Shower.propTypes = propTypes;
Shower.defaultProps = defaultProps;

export default Shower;
