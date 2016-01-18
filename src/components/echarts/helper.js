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

/**
 * 生成图形option
 * @param config 一些动态数据
 * @param type 图表类型
 * @param custom 图表独有的一些属性
 */
export function config2Option(config, type, custom = {}) {
  return {
    title: parseTitle(config),
    legend: parseLegend(config),
    xAxis: parseXAxis(config),
    yAxis: parseYAxis(config),
    series: parseSeries(config, type),
  };
}
