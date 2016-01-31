import React, { PropTypes } from 'react';
import { createUniqueId } from '../../tools/ztools';
import echarts from 'echarts';
import fetch from 'isomorphic-fetch';
import shallowEqual from 'react-pure-render/shallowEqual';
import { Loader } from 'react-loaders';
import { LOADING_STYLE } from '../../config';
import chinaJson from './geo/china.json';
import { parse } from '../../tools/jsonEx';
import { getThemeByName } from '../../tools/styleTools';
import { generateOption } from '../../tools/echartsOption';
import _ from 'lodash';

//map register
echarts.registerMap('china', chinaJson);

class PBECharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: createUniqueId('PBECharts'),
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
    console.log('>>> PBECharts:componentDidMount', this.state.option);
    const theme = getThemeByName(this.props.theme);
    chart.setOption(_.merge(this.state.option, theme.echarts));
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('>>> PBECharts:componentWillReceiveProps', this.props, nextProps, nextState);
    if (this.props.config.mode !== nextProps.config.mode
      || this.props.config.localData !== nextProps.config.localData
      || this.props.config.remoteDataUrl !== nextProps.config.remoteDataUrl) {
      this._getData(this, nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>> PBECharts:shouldComponentUpdate', this.props.theme, nextProps, nextState);
    return (this.props.config.mode !== nextProps.config.mode
      || this.props.config.localData !== nextProps.config.localData
      || this.props.config.remoteDataUrl !== nextProps.config.remoteDataUrl
      || this.state.remoteLoading !== nextState.remoteLoading
      || this.props.theme !== nextProps.theme
      //|| shallowEqual(this.state.option, nextState.option)
    );
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('>>> PBECharts:componentWillUpdate', nextProps, nextState);
    //this._getData(this, nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>> PBECharts:componentDidUpdate', this.state.option);
    const chart = echarts.init(document.getElementById(this.state.id));
    const theme = getThemeByName(this.props.theme);
    chart.setOption(_.merge(this.state.option, theme.echarts));
  }

  componentWillUnmount() {
    const chart = echarts.init(document.getElementById(this.state.id))
    chart.dispose()
  }

  _getData(bind, props) {
    const { config } = props;
    //console.log('>>> PBECharts:_getData:', config);
    //local是同步获取,remote是通过远程api异步获取
    if (config.mode === 'local') {
      this.setState({ option: parse(config.localData), remoteLoading: false });
    } else {
      this.setState({ remoteLoading: true });
      fetch(config.remoteDataUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          const convert = _.merge(parse(config.localData),generateOption(result, config.type));
          //console.log('>>> PBECharts:fetch', result, convert);
          bind.setState({ option: convert, remoteLoading: false });
          return result;
        })
        .catch(function (ex) {
          console.log(ex);
        });
    }
  }

  render() {
    console.log('>>> PBECharts:render:', this.state.id, this.state.option);

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

PBECharts.propTypes = {
  theme: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};

export default PBECharts;
