/**
 * 工作区面板
 * liekkas.zeng
 */
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import update from 'react-addons-update';
import _ from 'lodash';
import Placer from './Placer';
import PlacerSpace from './PlacerSpace';
import { createUniqueId } from '../../../tools/ztools';
import { Dialog, FlatButton } from 'material-ui';
import { Lookup } from '../../../constants/LookUp';

//使用scrollwidth有效
//let s = "";
//s += " 网页可见区域宽："+ document.body.clientWidth+"\n";
//s += " 网页可见区域高："+ document.body.clientHeight+"\n";
//s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"+"\n";
//s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"+"\n";
//s += " 网页正文全文宽："+ document.body.scrollWidth+"\n";
//s += " 网页正文全文高："+ document.body.scrollHeight+"\n";
//s += " 网页被卷去的高(ff)："+ document.body.scrollTop+"\n";
//s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop+"\n";
//s += " 网页被卷去的左："+ document.body.scrollLeft+"\n";
//s += " 网页正文部分上："+ window.screenTop+"\n";
//s += " 网页正文部分左："+ window.screenLeft+"\n";
//s += " 屏幕分辨率的高："+ window.screen.height+"\n";
//s += " 屏幕分辨率的宽："+ window.screen.width+"\n";
//s += " 屏幕可用工作区高度："+ window.screen.availHeight+"\n";
//s += " 屏幕可用工作区宽度："+ window.screen.availWidth+"\n";
//s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"+"\n";
//s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"+"\n";
//console.log(s, clientWidth, clientHeight, window.screen.width, window.screen.height);
//
//let clientWidth = document.body.scrollWidth;
//let clientHeight = document.body.scrollHeight;
//
//const windowRation = clientWidth / clientHeight;
////公式通过样式定义而来
//const workSpaceRatio = (100 * windowRation - 2) * 0.92 / 89;
//
//根据页面大小动态计算工作区的xywh,公式依赖布局,可见containers/Marker/style.scss中的定义
function calcXYWH(clientWidth, clientHeight) {
  return {
    x: (clientWidth - (2 * (clientHeight / 100))) * 0.08 + (1 * (clientHeight / 100)),
    y: 10 * (clientHeight / 100),
    w: (clientWidth - (2 * (clientHeight / 100))) * 0.92,
    h: 89 * (clientHeight / 100),
  };
}

let xywh = calcXYWH(document.body.scrollWidth, document.body.scrollHeight);

function handleConfigPlacer() {
  //const index = _.findIndex(this.state.placers, 'name', name);
  console.log('>>> Config,');

  //this.setState(update(this.state, {
  //  placers: {
  //    $splice: [[index, 1]]
  //  }
  //}));
  //this.props.onRemovePlacer(name);
}

class WorkSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placers: this.props.placers,
      open: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(e) {
    xywh = calcXYWH(document.body.scrollWidth, document.body.scrollHeight);
  }

  /**
   * 处理工作区中已有的Placer拖拽和缩放,这是更新操作
   * 注意在hover当中就已经实时的把位置大小确定了,所以不需要最终再更新一遍
   * 这里主要是提供一个接口往state树中来更新最终信息.
   * */
  handlePlacerDrop(item, nodeXY) {
    const { name } = item;
    const index = _.findIndex(this.state.placers, 'name', name);
    this.props.dropPlacerOnWorkspace(this.state.placers[index]);
    //console.log('>>> handlePlacerDrop:', name, index);
  }

  /**
   * 处理组件库往工作区中中拖拽,这是新增操作
   * */
  handleComponentDrop(item, nodeXY) {
    const { name, type } = item;
    const { x, y } = nodeXY;

    //限制在workspace内
    const calcX = Math.max(xywh.x, x);
    const calcY = Math.max(xywh.y, y);

    const xValue = ((calcX - xywh.x) / xywh.w * 100).toFixed(4);
    const yValue = ((calcY - xywh.y) / xywh.h * 100).toFixed(4);

    const layout = { name: createUniqueId('Placer'), x: Number(xValue), y: Number(yValue),
      w: 30, h: 30, componentType: type, componentId: createUniqueId(type), componentConfig: {} };
    this.setState(update(this.state, {
      placers: {
        $push: [layout],
      },
    }));

    this.props.dropComponentIntoWorkspace(layout);

    console.log('>>> handleComponentDrop:', name, type);
  }

  //处理拖拽和缩放
  handlePlacerHover(item, nodeXY, mouseXYOffset) {
    const { name, w, h, isDrag } = item;

    //限制在workspace内
    let calcX = Math.max(xywh.x, nodeXY.x);
    let calcY = Math.max(xywh.y, nodeXY.y);

    const nodeW = xywh.w * w * 0.01;
    const nodeH = xywh.h * h * 0.01;

    if (nodeW + calcX > xywh.w + xywh.x) {
      calcX = xywh.x + xywh.w - nodeW;
    }
    if (nodeH + calcY > xywh.h + xywh.y) {
      calcY = xywh.y + xywh.h - nodeH;
    }

    //console.log('>>> handlePlacerHover:', isDrag, nodeW, nodeH, calcX, calcY);

    const index = _.findIndex(this.state.placers, 'name', name);

    if (isDrag) {
      const xValue = ((calcX - xywh.x) / xywh.w * 100).toFixed(4);
      const yValue = ((calcY - xywh.y) / xywh.h * 100).toFixed(4);
      this.setState(update(this.state, {
        placers: {
          [index]: {
            $merge: { x: Number(xValue), y: Number(yValue) }
          }
        },
      }));
    } else {
      let calcW = nodeW + mouseXYOffset.x;
      let calcH = nodeH + mouseXYOffset.y;
      const wValue = (calcW / xywh.w * 100).toFixed(4);
      const hValue = (calcH / xywh.h * 100).toFixed(4);
      this.setState(update(this.state, {
        placers: {
          [index]: {
            $merge: { w: Number(wValue), h: Number(hValue) }
          }
        },
      }));
    }

    //console.log('>>> handlePlacerHover:', name, index);
  }

  handleCanPlacerDrop(item, nodeXY) {
    const { name } = item;
    const { x, y } = nodeXY;

    //限制在workspace内

    return x < xywh.x || y < xywh.y;
  }

  handleRemovePlacer(name) {
    console.log('>>> Remove,', name);
    const index = _.findIndex(this.state.placers, 'name', name);
    this.setState(update(this.state, {
      placers: {
        $splice: [[index, 1]]
      }
    }));
    this.props.onRemovePlacer(name);
  }

  handleConfigPlacer(name, type, config) {
    const index = _.findIndex(this.state.placers, 'name', name);
    this.setState({ open: true, editorPlacer: name, editorType: type });

    //if(!this.state.hasOwnProperty('editorConfig')) {
    //  this.setState({ editorConfig: config });
    //}
    console.log('>>> Config,', name, index);

    //this.setState(update(this.state, {
    //  placers: {
    //    $splice: [[index, 1]]
    //  }
    //}));
    //this.props.onRemovePlacer(name);
  }

  //单个组件设置保存
  handleConfigSubmit = (config) => {
    const { editorPlacer, placers } = this.state;
    const index = _.findIndex(placers, 'name', editorPlacer);
    this.setState(update(this.state, {
      placers: {
        [index]: {
          $merge: { componentConfig: config }
        }
      },
    }));

    this.setState({ open: false });
    this.props.onConfigPlacer({ name: editorPlacer, componentConfig: config });
  };


  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  };

  componentWillReceiveProps(nextProps, nextContext) {
    //console.log('>>> WorkSpace::', nextProps, nextContext);
    this.setState({ placers: nextProps.placers });
  }

  //shouldComponentUpdate(nextProps, nextState) {
  //  console.log('>>> WorkSpace:shouldComponentUpdate', nextProps, nextState);
  //  return true;
  //}
  /*

    renderLayout(row, column) {
      const { dropTargetPlaceholder } = this.state;
      return _.range(row).map((index) =>
        <HBox w="100%" h={100 / row + '%'} key={index}>
          {
            _.range(column).map((i) =>
              <Placeholder w={100 / column + '%'} h="100%"
                           name={_.uniqueId('Placeholder')} key={i}
                           droppedEleType="void"
                           onDrop={(item) => this.handleDrop(item, i)} />
            )
          }
        </HBox>
      );
    }
  */

  //渲染组件的设置器
  renderEditor() {
    const { open, placers, editorPlacer, editorType,  } = this.state;
    if (open) {
      const index = _.findIndex(placers, 'name', editorPlacer);
      return React.createElement(
        Lookup[editorType + 'Editor'],
        {
          config: placers[index].componentConfig,
          onSave: (config) => this.handleConfigSubmit(config),
          onCancel: () => this.setState({open: false})
        }
      );
    } else {
      return null;
    }
  }

  render() {
    const { screenRatio, screenNums } = this.props;

    const [wR, hR] = screenRatio.split(':');
    const [row, column] = screenNums.split('*');
    //总长高比
    const ratio = (wR * column) / (hR * row);
    //const ratio = (wR) / (hR);
    //const w = ratio > workSpaceRatio ? '100%' : (100 / ratio / workSpaceRatio) + '%';
    //const h = ratio > workSpaceRatio ? (100 / ratio * workSpaceRatio) + '%' : '100%';
    //
    //console.log('workSpaceRatio:'+workSpaceRatio+' ratio:'+ratio + ' w:' + w + ' h:' + h);

    return (
      <PlacerSpace onPlacerDrop={(item, nodeXY) => this.handlePlacerDrop(item, nodeXY)}
                   onComponentDrop={(item, nodeXY) => this.handleComponentDrop(item, nodeXY)}
                   onCanPlacerDrop={(item, nodeXY) => this.handleCanPlacerDrop(item, nodeXY)}
                   onPlacerHover={(item, nodeXY, mouseXYOffset) => this.handlePlacerHover(item, nodeXY, mouseXYOffset)}>
        {this.state.placers.map(({ name, x, y, w, h, componentType, componentId, componentConfig }, i) =>
          <Placer name={name} x={x} y={y} w={w} h={h} componentType={componentType}
                  componentId={componentId} componentConfig={componentConfig} key={i}
                  onRemovePlacer={(placeName) => this.handleRemovePlacer(placeName)}
                  onConfigPlacer={(placeName, type, config) => this.handleConfigPlacer(placeName, type, config)} />
        )}

        {
          this.state.open ? <Dialog
            title="Placer47 设置"
            style={{
            //width: '75%',
            height: '50%',
            //left: '25%',
          }}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}>
            { this.renderEditor() }
          </Dialog> : null
        }

      </PlacerSpace>
    );
  }
}

WorkSpace.propTypes = {
  placers: React.PropTypes.array.isRequired,
  screenRatio: React.PropTypes.string.isRequired,
  screenNums: React.PropTypes.string.isRequired,
  dropPlacerOnWorkspace: React.PropTypes.func.isRequired,
  dropComponentIntoWorkspace: React.PropTypes.func.isRequired,
  onRemovePlacer: React.PropTypes.func.isRequired,
  onConfigPlacer: React.PropTypes.func.isRequired,
};
WorkSpace.defaultProps = {
  placers: [],
};

export default WorkSpace;
/*

 <VBox w={w} h={h}>
 {this.renderLayout(row, column, ratio)}
 </VBox>

</HBox>*/
