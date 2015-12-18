import React from 'react';

const propTypes = {
};

const defaultProps = {
};

class About extends React.Component {
  render() {
    return (
      <div foo="About" className="bg-teal-300">About</div>
    );
  }
}

About.propTypes = propTypes;
About.defaultProps = defaultProps;

export default About;
