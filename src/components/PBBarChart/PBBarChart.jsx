import React, { PropTypes } from 'react';
import echarts from 'echarts/echarts';
import 'echarts/chart/line';
import 'echarts/chart/bar';
import _ from 'lodash';
import { createUniqueId } from '../../tools/ztools';
import { Loader } from 'react-loaders';
import fetch from 'isomorphic-fetch';
import { REST_API_BASE_URL, LOADING_STYLE } from '../../config';

//let option = {
//  title: {
//    text: 'ECharts 入门示例'
//  },
//  tooltip: {},
//  legend: {
//    data:['销量']
//  },
//  xAxis: {
//    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
//  },
//  yAxis: {},
//  series: [{
//    name: '销量',
//    type: 'bar',
//    data: [5, 20, 36, 10, 10, 20]
//  }]
//};

export default class PBBarChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: createUniqueId('EChartsLine'),
      option: this.getData(this),
    };
  }

  getData(bind) {
    fetch('http://localhost:4000/api/v1/chart')
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        //console.log('>>> Shower:getSceneById2:', result);

        const option = {};
        option.title = {
          text: result.title,
          subtext: result.subTitle,
        };
        option.legend = {
          data: result.legend,
        };
        option.xAxis = {
          data: result.labels,
        };
        option.yAxis = [
          {
            type : 'value',
            axisLabel : {
              formatter: '{value} %'
            }
          }
        ];
        const series = [];
        _.forEach(result.legend, function (item) {
          series.push({
            name: item,
            type: 'bar',
            data: result[item],
          });
        });
        option.series = series;
        option.update = true;

        bind.setState({ option });
        return result;
      })
      .catch(function (ex) {
        console.log(ex);
      });
  }

  componentDidMount() {
    const chart = echarts.init(document.getElementById(this.state.id));
    //option.title.text = this.props.config.title;
    //chart.setOption(option);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>> PBBarChart:shouldComponentUpdate', nextProps, nextState);
    return this.props.config !== nextProps.config;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>> PBBarChart:update', this.props.id);
    const chart = echarts.init(document.getElementById(this.state.id));
    //option.series[0].data[2] = _.random(100);
    //option.title.text = this.props.config.title;
    chart.setOption(this.state.option);
    chart.resize();
  }

  render() {
    console.log('>>> PBBarChart:render:', this.state.id, this.props.id);
    return (
        <div id={this.state.id} ref="chart" style={{ width: '100%', height: '100%' }} />
    );
  }
}

PBBarChart.propTypes = {
  id: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};
PBBarChart.defaultProps = {
  config: { title: '33' },
};

