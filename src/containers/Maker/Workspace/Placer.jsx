import React, { PropTypes } from 'react';
import { ItemTypes } from '../../../constants/DndTypes';
import { DragSource } from 'react-dnd';
import style from './style.scss';
import { FontIcon, IconButton, RaisedButton } from 'material-ui';
import { Colors } from 'material-ui/lib/styles';
import classNames from 'classnames/bind';
import { Lookup } from '../../../constants/LookUp';
import shallowEqual from 'react-pure-render/shallowEqual';
import { Loader } from 'react-loaders';

const cx = classNames.bind(style);
let isDrag = true;

const source = {
  beginDrag(props) {
    return {
      name: props.name,
      w: props.w,
      h: props.h,
      isDrag: isDrag,
    };
  },

  //isDragging(props, monitor) {
  //  const item = monitor.getItem();
  //  return props.name === item.name;
  //},
  //
  //endDrag: function (props, monitor, component) {
  //  if (!monitor.didDrop()) {
  //    return;
  //  }
  //},

};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Placer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //theme: this.context.theme,
    };
  }

  //使用一张1px的空白图来实现preview隐藏效果
  componentDidMount() {
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img);
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAG66AABuugHW3rEXAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAADElEQVQIHWNgIAoAAAAnAAFYYnoBAAAAAElFTkSuQmCC';
  }
  //
  //componentWillReceiveProps(nextProps, nextState) {
  //  console.log('>>> Placer:componentWillReceiveProps:', this.props,nextProps);
  //}
  //
  //componentDidUpdate(prevProps, prevState) {
  //  console.log('>>> Placer:componentDidUpdate:', this.props.name);
  //}

  renderComponent() {
    const { componentType, componentId, componentConfig, theme } = this.props;
    if (Lookup.hasOwnProperty(componentType)) {
      return React.createElement(
        Lookup[componentType].comp, {id: componentId, config: componentConfig, theme}
      );
    }
    return null;
  }

  onConfig() {
    alert('haaa');
  }

  //通过mouseEnter和mouseLeave来控制当前是拖拽模式还是缩放模式
  //这个组合比mouseDown和mouseUp靠谱
  setDrag(flag) {
    isDrag = flag;

    if (isDrag !== flag) {
      console.log('>>> Placer:setDrag', flag);
    }
  }

  onRefresh() {

    this.forceUpdate();
  }

  //因为缩放涉及组件外观发生很大变化,所以当缩放时那么需要卸载组件再重装组件,中间用个过渡效果来指示
  //这样缩放后立马就能看到效果了
  render() {
    const { x, y, w, h, name, componentType, componentConfig, connectDragSource, isDragging,
      onRemovePlacer, onConfigPlacer } = this.props;
    //console.log('>>> Placer:render:', name);
    //
    //if (isDragging) {
    //  return null;
    //}

    const configClassName = cx('config', 'zmdi', 'zmdi-settings');
    const removeClassName = cx('remove', 'zmdi', 'zmdi-delete');
    const resizeClassName = cx('resize', 'zmdi', 'zmdi-aspect-ratio-alt');

    return connectDragSource(
      <div style={{
        position: 'absolute',
        //overflow: 'none',
        width: w + '%',
        height: h + '%',
        left: x + '%',
        top: y + '%',
        margin: 0,
        padding: 0,
        //visibility: isDragging ? 'hidden' : 'visible',
        opacity: isDragging ? 0.6 : 1,
        border: isDragging ? 'solid 2px rgba(255, 0, 0, 0.8)' : 'solid 2px rgba(255, 255, 255, 0.4)',
        backgroundColor: isDragging ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.1)',
      }}>
        { !isDragging ? this.renderComponent() : isDrag ? this.renderComponent() :
          <div className={style.resizeBox}><Loader type="ball-beat" active={true} /></div> }
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          fontSize: '24px',
          backgroundColor: 'rgba(255,255,255,0.6)',
          //zIndex: '3',
        }}>
          <span className={configClassName}
                onClick={() => onConfigPlacer(name, componentType, componentConfig)} />
          <span className={removeClassName}
                onClick={() => onRemovePlacer(name)} />
        </div>
        <div className={resizeClassName}
             onMouseLeave={ () => this.setDrag(true) }
             onMouseEnter={ () => this.setDrag(false) } />
      </div>
    );
  }
}

Placer.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  componentType: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
  componentConfig: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,

  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  onRemovePlacer: PropTypes.func,
  onConfigPlacer: PropTypes.func,
};

//只有位置,尺寸变化才重新渲染
function arePropsEqual(nextProps, props) {
  return nextProps.x === props.x &&
    nextProps.y === props.y &&
    nextProps.w === props.w &&
    nextProps.h === props.h &&
    nextProps.theme === props.theme &&
    shallowEqual(nextProps.componentConfig, props.componentConfig);
}

const options = { arePropsEqual };

export default DragSource(ItemTypes.Placer, source, collect, options)(Placer);
