import React from 'react';
import style from './style.scss';
import { Loader } from 'react-loaders';
import fetch from 'isomorphic-fetch';
import { REST_API_BASE_URL, LOADING_STYLE } from '../../config';
import Showspace from './Showspace';

/**
 * 单个场景的呈现
 */
class Shower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: this.getDate(this)
    };
  }

  getDate(bind) {
    const { userName, sceneId } = this.props.params;
    fetch(REST_API_BASE_URL + userName + '/' + sceneId)
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        //console.log('>>> Shower:getSceneById2:', result);
        bind.setState({ scene: result });
        return result;
      })
      .catch(function (ex) {
        console.log(ex);
      });
  }

  //shouldComponentUpdate(nextProps, nextState) {
  //  console.log('>>> Show:shouldComponentUpdate', nextState);
  //  return true;
  //}

  render() {
    console.log('>>> Shower:', this.state.scene);

    const { scene } = this.state;
    return (
      <div className={style.root}>
        {scene ? <Showspace scene={scene} bgColor="#336699"/> : <Loader type={LOADING_STYLE} active={true} />}
      </div>
    );
  }
}

Shower.propTypes = {
};

export default Shower;
