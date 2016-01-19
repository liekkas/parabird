/**
 * Created by liekkas on 16/1/18.
 */
import _ from 'lodash';

function parseTitle(config) {
  return {
    text: config.title,
    subtext: config.subTitle,
  };
}

function parseLegend(config) {
  return {
    data: config.legend,
  };
}

function parsePieLegend(config) {
  return {
    orient: 'vertical',
    x: 'left',
    y: 'bottom',
    data: _.map(config.data, 'name'),
  };
}

function parseXAxis(config) {
  return {
    data: config.labels,
  };
}

function parseYAxis(config) {
  return {
    data: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
  };
}

function parseSeries(config, type) {
  const series = [];
  _.forEach(config.legend, function (item) {
    series.push({
      name: item,
      type: type,
      data: config[item],
    });
  });
  return series;
}

function parsePieSeries(config, type) {
  const series = [];
  series.push({
    name: config.title,
    type,
    data: config.data,
  });
  return series;
}

function parseMapSeries(config, type) {
  const series = [];
  _.forEach(config.legend, function (item) {
    series.push({
      name: item,
      type: type,
      mapType: config.mapType,
      itemStyle: {
        normal: {label: {show: true}},
        emphasis: {label: {show: true}}
      },
      data: config[item],
    });
  });
  return series;
}

/**
 * 生成图形option
 * @param config 一些动态数据
 * @param type 图表类型
 * @param custom 图表独有的一些属性
 */
export function config2Option(config, type, custom = {}) {
  switch (type) {
    case 'line':
    case 'bar':
      return {
        title: parseTitle(config),
        legend: parseLegend(config),
        xAxis: parseXAxis(config),
        yAxis: parseYAxis(config),
        series: parseSeries(config, type),
      };
    case 'pie':
      return {
        title: parseTitle(config),
        legend: parsePieLegend(config),
        series: parsePieSeries(config, type),
      };
    case 'gauge':
      return {
        title: parseTitle(config),
        series: parsePieSeries(config, type),
      };
    case 'map':
      return {
        title: parseTitle(config),
        legend: parseLegend(config),
        series: parseMapSeries(config, type),
      };
    default:
      return {};
  }
}
