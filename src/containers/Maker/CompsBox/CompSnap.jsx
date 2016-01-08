/**
 * 单个组件图标,可以拖拽到工作区
 * Created by liekkas on 15/12/21.
 */
import React from 'react';
import { ItemTypes } from '../../../constants/DndTypes';
import { DragSource } from 'react-dnd';
import defaultCompSnap from './default.png';
import style from './style.scss';

const source = {
  beginDrag(props) {
    return {
      name: props.name,
      type: props.type,
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function getStyle(isDragging) {
  return {
    border: isDragging ? 'solid 2px rgba(255, 0, 0, 0.8)' : 'solid 2px rgba(255, 255, 255, 0.5)',
    cursor: 'move',
  };
}

class CompSnap extends React.Component {
  render() {
    const { connectDragSource, isDragging, image, name } = this.props;
    return connectDragSource(
      <div className={style.snap} style={getStyle(isDragging)}>
        <img src={image} style={{ width: '4vmin', height: '4vim' }}/>
        <label>{name}</label>
      </div>
    );
  }
}

CompSnap.propTypes = {
  image: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired
};
CompSnap.defaultProps = {
  image: defaultCompSnap,
  name: '组件名称',
  type: 'void',
};

export default DragSource(ItemTypes.CompSnap, source, collect)(CompSnap);
