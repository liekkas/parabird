/**
 * 组件库
 */
import React from 'react';
import { RaisedButton } from 'material-ui';
import CompSnap from './CompSnap';
import singleColumn from './singleColumn.png';
import singleLine from './singleLine.png';
import image from './image.png';

class CompsBox extends React.Component {
  render() {
    return (
      <div>
        <CompSnap name="占位组件" type="Void"/>
        <CompSnap image={image} name="图片" type="PBImage"/>
        <CompSnap name="性能图表" type="Button"/>
        <CompSnap image={singleLine} name="线状图" type="LineChart"/>
      </div>
    );
  }
}

CompsBox.propTypes = {

};

CompsBox.defaultProps = {

};

export default CompsBox;
