import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import Placer from '../Workspace/Placer';

class Showspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderScene() {
    //return null;
    return this.props.scene.placers.map(({ name, x, y, w, h, componentType }, i) =>
      <Placer name={name} x={x} y={y} w={w} h={h} componentType={componentType} key={i}/>);
  }

  render() {
    const { scene, bgColor, isPreview, onClosePreView } = this.props;
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        backgroundColor: bgColor,
        height: '100vh',
      }}>
        {this.renderScene()}
        {
          isPreview ? <div style={{
            padding: '2vh',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <RaisedButton label="关闭预览" primary={true} onClick={onClosePreView} />
          </div> : null
        }
      </div>
    );
  }
}

Showspace.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  onClosePreView: PropTypes.func,
  bgColor: PropTypes.string.isRequired,
  scene: PropTypes.object.isRequired,
};
Showspace.defaultProps = {
  isPreview: 'false',
  bgColor: '#FFFFFF',
  scene: { placers: [] },
};

export default Showspace;
