/**
 * Created by liekkas on 16/1/25.
 */
const _ = require('lodash');

/**
 * 柱/线图
 */
function lineBar(num) {
  const legend = [];
  for (var ii = 1; ii <= num; ii++) {
    legend.push('类别' + ii);
  }

  const data = [];
  for (var i = 1; i <= 7; i++) {
    var obj = { label: i + '号' };
    for (var i2 = 0; i2 < num; i2++) {
      obj[legend[i2]] = _.random(100);
    }
    data.push(obj);
  }

  return {
    title: '图表标题',
    subTitle: '从1号到7号',
    legend: legend,
    data: data,
    unit: '单位',
  };
}

/**
 * 饼/环图
 */
function pie(num) {
  const data = [];
  for (var ii = 1; ii <= num; ii++) {
    data.push({
      name: '类别' + ii,
      value: _.random(100),
    });
  }

  return {
    title: '饼图标题',
    category: '大分类',
    data: data,
  };
}

module.exports = {
  lineBar: (num) => lineBar(num),
  pie: (num) => pie(num),
};
