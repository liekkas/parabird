import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import PurePlacer from './PurePlacer';
import style from './style.scss';
import { Colors } from 'material-ui/lib/styles';

/**
 * 单个场景呈现界面
 */
class Showspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClose: false,
    };
  }

  //退出场景并关闭当前窗口
  _handleClick() {
    console.log('>>> Showspace Closed');
    window.close();
  }

  renderScene() {
    //return null;
    return this.props.scene.placers.map(({ name, x, y, w, h, componentType, componentId, componentConfig }, i) =>
      <PurePlacer name={name} x={x} y={y} w={w} h={h} theme={this.props.scene.theme}
                  componentType={componentType} componentId={componentId}
                  componentConfig={componentConfig} key={i}/>);
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
        zIndex: 32,
      }}>
        {this.renderScene()}
        {
          isPreview ? <div style={{
            padding: '2vh',
            display: 'flex',
            justifyContent: 'center',
            zIndex: '3',
          }}>
            <RaisedButton label="关闭预览" primary={true} onClick={onClosePreView} />
          </div> : <div style={{
            width: '100%',
            height: '5vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            backgroundColor: Colors.red400,
            opacity: this.state.showClose ? 1 : 0,
            zIndex: '999',
          }} onClick={this._handleClick} onMouseEnter={() => this.setState({ showClose: true })}
                        onMouseLeave={() => this.setState({ showClose: false })}>
            <label style={{ cursor: 'pointer' }}>退出该场景</label>
          </div>
        }
      </div>
    );
  }
}

Showspace.propTypes = {
  isPreview: PropTypes.bool,
  onClosePreView: PropTypes.func,
  bgColor: PropTypes.string,
  scene: PropTypes.object.isRequired,
};
Showspace.defaultProps = {
  isPreview: false,
  bgColor: '#FFFFFF',
  scene: { placers: [] },
};

export default Showspace;
