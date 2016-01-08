import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { ItemTypes } from '../../../constants/DndTypes';
import { DropTarget } from 'react-dnd';

const target = {
  canDrop(props, monitor) {

    const item = monitor.getItem();
    const itemType = monitor.getItemType();
    //const mouseInitXY = monitor.getInitialClientOffset(); //初始鼠标位置
    //const nodeInitXY = monitor.getInitialSourceClientOffset(); //初始组件位置
    //const lastMouseXY = monitor.getClientOffset(); //完成时鼠标位置
    //const mouseXYOffset = monitor.getDifferenceFromInitialOffset(); //完成时鼠标相对初始值的偏差
    const lastNodeXY = monitor.getSourceClientOffset(); //完成时组件位置
    //console.log(nodeInitXY, lastNodeXY);
    //if(itemType === 'Placer') {
    //  return props.onCanPlacerDrop(item, lastNodeXY);
    //}
    return true;
  },

  hover(props, monitor, component) {
    const item = monitor.getItem();
    const itemType = monitor.getItemType();
    //const mouseInitXY = monitor.getInitialClientOffset(); //初始鼠标位置
    //const nodeInitXY = monitor.getInitialSourceClientOffset(); //初始组件位置
    //const lastMouseXY = monitor.getClientOffset(); //完成时鼠标位置
    const mouseXYOffset = monitor.getDifferenceFromInitialOffset(); //完成时鼠标相对初始值的偏差
    const lastNodeXY = monitor.getSourceClientOffset(); //完成时组件位置
    //console.log(nodeInitXY, lastNodeXY);
    if(itemType === 'Placer') {
      props.onPlacerHover(item, lastNodeXY, mouseXYOffset);
    }
  },

  drop(props, monitor, component) {
    const item = monitor.getItem();
    const itemType = monitor.getItemType();
    //const mouseInitXY = monitor.getInitialClientOffset(); //初始鼠标位置
    //const nodeInitXY = monitor.getInitialSourceClientOffset(); //初始组件位置
    //const lastMouseXY = monitor.getClientOffset(); //完成时鼠标位置
    //const mouseXYOffset = monitor.getDifferenceFromInitialOffset(); //完成时鼠标相对初始值的偏差
    const lastNodeXY = monitor.getSourceClientOffset(); //完成时组件位置
    //console.log('>> drop', itemType);
    if(itemType !== 'Placer') {
      props.onComponentDrop(item, lastNodeXY);
    } else {
      props.onPlacerDrop(item, lastNodeXY);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    //canDrop: monitor.canDrop(),
  };
}

class PlacerSpace extends React.Component {
  render() {
    const { children, connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
        {children}
      </div>
    );
  }
}

PlacerSpace.propTypes = {
  onPlacerDrop: PropTypes.func.isRequired,
  onPlacerHover: PropTypes.func.isRequired,
  onCanPlacerDrop: PropTypes.func.isRequired,
  onComponentDrop: PropTypes.func.isRequired,
};
PlacerSpace.defaultProps = {
};

export default DropTarget([ItemTypes.Placer, ItemTypes.CompSnap], target, collect)(PlacerSpace);
