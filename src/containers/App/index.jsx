import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

//Material-UI部分组件依赖于此
injectTapEventPlugin();

export default class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
