import React, { PropTypes } from 'react';
import { createUniqueId } from '../../tools/ztools';
import { config2Option } from './helper';
import echarts from 'echarts/echarts';
import fetch from 'isomorphic-fetch';
import shallowEqual from 'react-pure-render/shallowEqual';
import { Loader } from 'react-loaders';
import { LOADING_STYLE } from '../../config';

class BaseECharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: createUniqueId('EChartsLine'),
      remoteLoading: false,
      remoteUrlChanged: false,
      option: {},
    };
  }

  componentWillMount() {
    this._getData(this, this.props);
  }

  componentDidMount() {
    const chart = echarts.init(document.getElementById(this.state.id));
    //option.title.text = this.props.config.title;
    console.log('>>> BaseECharts:componentDidMount', this.state.option);
    chart.setOption(this.state.option);
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('>>> BaseECharts:componentWillReceiveProps', nextProps, nextState);
    if (this.props.config.mode !== nextProps.config.mode
        || this.props.config.localData !== nextProps.config.localData
        || this.props.config.remoteDataUrl !== nextProps.config.remoteDataUrl
      ) {
      this._getData(this, nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>> BaseECharts:shouldComponentUpdate', nextProps, nextState);
    return (this.props.config.mode !== nextProps.config.mode
      || this.props.config.localData !== nextProps.config.localData
      || this.props.config.remoteDataUrl !== nextProps.config.remoteDataUrl
      || this.state.remoteLoading !== nextState.remoteLoading
      //|| shallowEqual(this.state.option, nextState.option)
    );
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('>>> BaseECharts:componentWillUpdate', nextProps, nextState);
    //this._getData(this, nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>> BaseECharts:componentDidUpdate', this.state.option);
    //const chart = echarts.init(document.getElementById(this.state.id));
    //chart.setOption(this.props.option);
    //chart.resize();
    const chart = echarts.init(document.getElementById(this.state.id));
    chart.setOption(this.state.option);
  }

  _getData(bind, props) {
    const { config, type, custom } = props;
    console.log('>>> BaseECharts:_getData:', config);
    //local是同步获取,remote是通过远程api异步获取
    if (config.mode === 'local') {
      this.setState({ option: config2Option(JSON.parse(config.localData), type, custom), remoteLoading: false });
    } else {
      this.setState({ remoteLoading: true });
      fetch(config.remoteDataUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          console.log('>>> BaseECharts:fetch', result);
          bind.setState({ option: config2Option(result, type, custom), remoteLoading: false });
          return result;
        })
        .catch(function (ex) {
          console.log(ex);
        });
    }
  }

  render() {
    console.log('>>> BaseECharts:render:', this.state.id, this.state.option);
    return (
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        <div id={this.state.id} style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute',
          left: '45%',
          top: '45%',
          display: this.state.remoteLoading ? '' : 'none',
        }}>
          <Loader type={LOADING_STYLE} active={true} />
        </div>
      </div>
    );
  }
}

BaseECharts.propTypes = {
  custom: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default BaseECharts;
