import React, { PropTypes } from 'react';
import _ from 'lodash';

/**
 * 辅助线组件,一旦创建不需要更新了
 */
class GridLinesHelper extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    //console.log('>>> GridHelper:render');
    return (
      <svg height="100%" width="100%" opacity="0.4">
        {
          _.range(1,50).map((i) =>
            <line key={i} x1="0" y1={i * 2 + '%'} x2="100%" y2={i * 2 + '%'} strokeWidth="1" stroke="white" />
          )
        }
        {
          _.range(1,80).map((i) =>
            <line key={i} x1={i * 1.25 + '%'} y1="0" x2={i * 1.25 + '%'} y2="100%" strokeWidth="1" stroke="white" />
          )
        }
      </svg>
    );
  }
}

export default GridLinesHelper;
