import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

//Material-UI部分组件依赖于此
injectTapEventPlugin();

const App = React.createClass({



  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export default App;
