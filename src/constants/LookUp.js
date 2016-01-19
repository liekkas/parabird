/**
 * Created by liekkas on 15/12/29.
 */
import * as comps from '../components';
import defaultImg from '../images/compsnaps/default.png';
import image from '../images/compsnaps/image.png';
import singleLine from '../images/compsnaps/singleLine.png';
import singleColumn from '../images/compsnaps/singleColumn.png';
import singlePie from '../images/compsnaps/single_pie.png';

/**
 *
 * @param name 组件中文名称
 * @param comp 组件类
 * @param editor 组件设置类
 * @param group 组件群组
 * @param img 组件库中的图标
 * @param w 组件默认宽度占比 如 30 即可视窗口的30%
 * @param h 组件默认高度占比
 * @param initConfig 组件初始设置值
 */
function generate(name, type, comp, editor, initConfig = {}, group = '通用', img = defaultImg, w = 30, h = 30) {
  return { name, type, comp, editor, initConfig, group, img, w, h };
}

//-------------------- 设置组件初始化数据 --------------------
//柱图/线图
function getInitBarChart() {
  const localData = JSON.stringify({
    'title': '性能TopN',
    'subTitle': '从1号到31号',
    'legend': ['最高值', '最低值'],
    'labels': ['周一', '周二', '周三', '周四', '周五'],
    '最高值': [20, 30, 32, 40, 50],
    '最低值': [10, 20, 22, 30, 40],
  });
  return {
    localData: localData,
    remoteDataUrl: 'http://localhost:4000/api/v1/chart',
    mode: 'local',
  };
}
//饼图/环图
function getInitPieChart() {
  const localData = JSON.stringify({
    'title': '无线网',
    'subTitle': '从1号到31号',
    'data': [
      { name: 'A', value: '102' },
      { name: 'B', value: '90' },
      { name: 'C', value: '45' },
      { name: 'D', value: '10' },
    ],
  });
  return {
    localData: localData,
    remoteDataUrl: 'http://localhost:4000/api/v1/chart/pie',
    mode: 'local',
  };
}
//仪表盘
function getInitGaugeChart() {
  const localData = JSON.stringify({
    'title': '均值得分',
    'subTitle': '从1号到31号',
    'data': [
      { name: '大盘数', value: '102' },
    ],
  });
  return {
    localData: localData,
    remoteDataUrl: 'http://localhost:4000/api/v1/chart/pie',
    mode: 'local',
  };
}
//地图
function getInitMapChart() {
  const localData = JSON.stringify({
    'title': '全国电视收视率',
    'subTitle': '从1号到31号',
    'mapType': 'china',
    'legend': ['白天', '晚上'],
    '白天': [
      {name: '北京',value: Math.round(Math.random()*10)},
      {name: '天津',value: Math.round(Math.random()*10)},
      {name: '上海',value: Math.round(Math.random()*10)},
      {name: '重庆',value: Math.round(Math.random()*10)},
      {name: '河北',value: Math.round(Math.random()*10)},
      {name: '河南',value: Math.round(Math.random()*10)},
      {name: '云南',value: Math.round(Math.random()*10)},
      {name: '辽宁',value: Math.round(Math.random()*10)},
      {name: '黑龙江',value: Math.round(Math.random()*10)},
      {name: '湖南',value: Math.round(Math.random()*10)},
      {name: '安徽',value: Math.round(Math.random()*10)},
      {name: '山东',value: Math.round(Math.random()*10)},
      {name: '新疆',value: Math.round(Math.random()*10)},
      {name: '江苏',value: Math.round(Math.random()*10)},
      {name: '浙江',value: Math.round(Math.random()*10)},
      {name: '江西',value: Math.round(Math.random()*10)},
      {name: '湖北',value: Math.round(Math.random()*10)},
      {name: '广西',value: Math.round(Math.random()*10)},
      {name: '甘肃',value: Math.round(Math.random()*10)},
      {name: '山西',value: Math.round(Math.random()*10)},
      {name: '内蒙古',value: Math.round(Math.random()*10)},
      {name: '陕西',value: Math.round(Math.random()*10)},
      {name: '吉林',value: Math.round(Math.random()*10)},
      {name: '福建',value: Math.round(Math.random()*10)},
      {name: '贵州',value: Math.round(Math.random()*10)},
      {name: '广东',value: Math.round(Math.random()*10)},
      {name: '青海',value: Math.round(Math.random()*10)},
      {name: '西藏',value: Math.round(Math.random()*10)},
      {name: '四川',value: Math.round(Math.random()*10)},
      {name: '宁夏',value: Math.round(Math.random()*10)},
      {name: '海南',value: Math.round(Math.random()*10)},
      {name: '台湾',value: Math.round(Math.random()*10)},
    ],
    '晚上': [
      {name: '北京',value: Math.round(Math.random()*10)},
      {name: '天津',value: Math.round(Math.random()*10)},
      {name: '上海',value: Math.round(Math.random()*10)},
      {name: '重庆',value: Math.round(Math.random()*10)},
      {name: '河北',value: Math.round(Math.random()*10)},
      {name: '河南',value: Math.round(Math.random()*10)},
      {name: '云南',value: Math.round(Math.random()*10)},
      {name: '辽宁',value: Math.round(Math.random()*10)},
      {name: '黑龙江',value: Math.round(Math.random()*10)},
      {name: '湖南',value: Math.round(Math.random()*10)},
      {name: '安徽',value: Math.round(Math.random()*10)},
      {name: '山东',value: Math.round(Math.random()*10)},
      {name: '新疆',value: Math.round(Math.random()*10)},
      {name: '江苏',value: Math.round(Math.random()*10)},
      {name: '浙江',value: Math.round(Math.random()*10)},
      {name: '江西',value: Math.round(Math.random()*10)},
      {name: '湖北',value: Math.round(Math.random()*10)},
      {name: '广西',value: Math.round(Math.random()*10)},
      {name: '甘肃',value: Math.round(Math.random()*10)},
      {name: '山西',value: Math.round(Math.random()*10)},
      {name: '内蒙古',value: Math.round(Math.random()*10)},
      {name: '陕西',value: Math.round(Math.random()*10)},
      {name: '吉林',value: Math.round(Math.random()*10)},
      {name: '福建',value: Math.round(Math.random()*10)},
      {name: '贵州',value: Math.round(Math.random()*10)},
      {name: '广东',value: Math.round(Math.random()*10)},
      {name: '青海',value: Math.round(Math.random()*10)},
      {name: '西藏',value: Math.round(Math.random()*10)},
      {name: '四川',value: Math.round(Math.random()*10)},
      {name: '宁夏',value: Math.round(Math.random()*10)},
      {name: '海南',value: Math.round(Math.random()*10)},
      {name: '台湾',value: Math.round(Math.random()*10)},
    ]
  });
  return {
    localData: localData,
    remoteDataUrl: 'http://localhost:4000/api/v1/chart/pie',
    mode: 'local',
  };
}

/**
 * 组件字典
 */
export const Lookup = {
  //通用系列
  PBImage: generate('图片', 'PBImage', comps.PBImage, comps.PBImageEditor, {}, '通用', image, 40),
  PBClock: generate('时钟', 'PBClock', comps.PBClock, comps.PBClockEditor),
  PBText: generate('文本', 'PBText', comps.PBText, comps.PBTextEditor, { title: '标题', text: '正文' }),
  PBTry: generate('试验品', 'PBTry', comps.PBTry, comps.PBTryEditor),
  //ECharts系列
  PBBarChartByECharts: generate('柱图', 'PBBarChartByECharts', comps.PBBarChartByECharts, comps.PBBarChartEditorByECharts,
    getInitBarChart(), '基础图表', singleColumn),
  PBLineChartByECharts: generate('线图', 'PBLineChartByECharts', comps.PBLineChartByECharts, comps.PBLineChartEditorByECharts,
    getInitBarChart(), '基础图表', singleLine),
  PBPieChartByECharts: generate('饼图', 'PBPieChartByECharts', comps.PBPieChartByECharts, comps.PBPieChartEditorByECharts,
    getInitPieChart(), '基础图表', singlePie),
  PBGaugeChartByECharts: generate('仪表盘', 'PBGaugeChartByECharts', comps.PBGaugeChartByECharts, comps.PBGaugeChartEditorByECharts,
    getInitGaugeChart(), '基础图表'),
  PBMapChartByECharts: generate('地图', 'PBMapChartByECharts', comps.PBMapChartByECharts, comps.PBMapChartEditorByECharts,
    getInitMapChart(), '基础图表'),
  //D3系列
};
