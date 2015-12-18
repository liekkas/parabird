import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, DropDownMenu, FontIcon, RaisedButton } from 'material-ui';
import Radium from 'radium';

const propTypes = {
};

const defaultProps = {
};

class Home extends React.Component {
  render() {
    return (
      <div>
        <button style={[
          styles.base,
          this.props.block && styles.block
        ]}>
          {this.props.children}
        </button>
        <div key="one" style={[styles.both, styles.one]} />
        <div key="two" style={[styles.both, styles.two]} />

        <button key="keyForButton" style={[ styles.button ]}>Hover me!</button>
        {Radium.getState(this.state, 'keyForButton', ':hover') ? (
          <span>{' '}Hovering!</span>
        ) : null}

      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const styles = {
  base: {
    background: 'blue',
    border: 0,
    borderRadius: 4,
    color: 'white',
    padding: '1.5em',
    width: '5rem',
    height: '2rem',
    ':hover': {
      backgroundColor: 'red'
    },
    ':focus': {
      backgroundColor: 'green'
    },
    ':active': {
      backgroundColor: 'blue'
    },
  },

  block: {
    display: 'block',
    ':hover': {
      boxShadow: '0 10px 0 rgba(255,0,0,0.8)'
    }
  },

  both: {
    background: 'black',
    border: 'solid 1px white',
    height: 100,
    width: 100
  },
  one: {
    ':hover': {
      background: 'blue',
    }
  },
  two: {
    ':hover': {
      background: 'red',
    }
  },
  button: {
    ':hover': {
      background: 'pink',
    }
  }
};


export default Radium(Home);
//export default Home;

