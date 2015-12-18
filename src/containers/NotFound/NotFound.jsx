import React from 'react';

const propTypes = {};

const defaultProps = {};

class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}

NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
