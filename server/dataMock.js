/**
 * Created by liekkas on 16/1/25.
 */

/**
 * 单柱/线图
 */
function singleLineBar() {
  return {
    title: '性能TopN',
    subTitle: '从1号到31号',
    labels: ['周一', '周二', '周三', '周四', '周五'],
    最低值: [10, 20, 22, 30, 40],
  };
}

/**
 * 多柱/线图
 */
function multiLineBar() {
  return {
    title: '性能TopN',
    subTitle: '从1号到31号',
    legend: ['最高值', '最低值'],
    labels: ['周一', '周二', '周三', '周四', '周五'],
    最高值: [20, 30, 32, 40, 50],
    最低值: [10, 20, 22, 30, 40],
  };
}

module.exports = {
  singleLineBar: singleLineBar(),
  multiLineBar: multiLineBar(),
};
