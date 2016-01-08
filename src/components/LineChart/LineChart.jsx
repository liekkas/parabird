import React, { PropTypes } from 'react';
import echarts from 'echarts/echarts';
import 'echarts/chart/line';
import 'echarts/chart/bar';
import _ from 'lodash';
import { createUniqueId } from '../../tools/ztools';

let option = {
  //backgroundColor:colors.red['500'],
  //backgroundColor:styles.myLine,

  title : {
    text: '未来一周气温变化',
    subtext: '纯属虚构',
    textStyle: {
      fontWeight: 'normal',
      color: '#FF0000'
    }
  },
  tooltip : {
    trigger: 'axis'
  },
  legend: {
    data:['最高气温','最低气温']
  },
  toolbox: {
    show : true,
    feature : {
      mark : {show: true},
      dataView : {show: true, readOnly: false},
      magicType : {show: true, type: ['line', 'bar']},
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },
  calculable : true,
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
      data : ['周一','周二','周三','周四','周五','周六','周日']
    }
  ],
  yAxis : [
    {
      type : 'value',
      axisLabel : {
        formatter: '{value} °C'
      }
    }
  ],
  series : [
    {
      name:'最高气温',
      type:'line',
      data:[11, 11, 15, 13, 12, 13, 10],
      markPoint : {
        data : [
          {type : 'max', name: '最大值'},
          {type : 'min', name: '最小值'}
        ]
      },
      markLine : {
        data : [
          {type : 'average', name: '平均值'}
        ]
      }
    },
    {
      name:'最低气温',
      type:'line',
      data:[1, -2, 2, 5, 3, 2, 0],
      markPoint : {
        data : [
          {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
        ]
      },
      markLine : {
        data : [
          {type : 'average', name : '平均值'}
        ]
      }
    }
  ]
};

let mychart;

export default class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: createUniqueId('EChartsLine'),
    };
  }

  componentDidMount() {
    mychart = echarts.init(document.getElementById(this.state.id));
    let theme = {
      color:['#FF00FF'],
      title: {
        itemGap: 8,
        textStyle: {
          fontWeight: 'normal',
          color: '#FF0000'
        }
      },
    };
    option.title.text = this.props.config.title;
    mychart.setOption(option, theme);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>> LineChart:shouldComponentUpdate', nextProps, nextState);
    return this.props.config.title !== nextProps.config.title;
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('>>> LineChart:update', this.props.id);
    option.series[0].data[2] = _.random(100);
    option.title.text = this.props.config.title;
    mychart.setOption(option);
  }

  render() {
    //console.log('>>> LineChart:render:', this.props.id);

    return (
        <div id={this.state.id} style={{ width: '100%', height: '100%' }} />
    );
  }
}

LineChart.propTypes = {
  id: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};
LineChart.defaultProps = {
  config: { title: '33' },
};

