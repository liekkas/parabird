import React, { PropTypes } from 'react';
import { Lookup } from '../../constants/LookUp';

/**
 * 呈现界面的组件父容器
 */
class PurePlacer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  //shouldComponentUpdate(nextProps, nextState) {
  //  console.log('>>> Placer:shouldComponentUpdate', nextProps, nextState);
  //  return false;
  //}

  renderComponent() {
    const { componentType, componentId, componentConfig } = this.props;
    if (Lookup.hasOwnProperty(componentType)) {
      return React.createElement(
        Lookup[componentType], { id: componentId, config: componentConfig }
      );
    } else {
      return null;
    }
  }

  render() {
    const { x, y, w, h, } = this.props;

    return (
      <div style={{
        position: 'absolute',
        width: w + '%',
        height: h + '%',
        left: x + '%',
        top: y + '%',
        margin: 0,
        padding: 0,
        border: 'solid 2px rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}>
        {this.renderComponent()}
      </div>
    );
  }
}

PurePlacer.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  componentType: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
  componentConfig: PropTypes.object.isRequired,
};

PurePlacer.defaultProps = {
  x: 2,
  y: 2,
  w: 100,
  h: 100,
  name: '_Placer',
  componentType: 'Void',
  componentId: '_Void',
  componentConfig: {},
};

export default PurePlacer;
