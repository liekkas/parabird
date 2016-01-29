/**
 * Created by liekkas on 15/12/29.
 */
import * as comps from '../components';
import defaultImg from '../images/compsnaps/default.png';
import image from '../images/compsnaps/image.png';
import singleLine from '../images/compsnaps/singleLine.png';
import singleColumn from '../images/compsnaps/singleColumn.png';
import singlePie from '../images/compsnaps/single_pie.png';
import * as init from './init';

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

/**
 * 组件字典
 */
export const Lookup = {
  //通用系列
  PBImage: generate('图片', 'PBImage', comps.PBImage, comps.PBImageEditor, {}, '通用', image, 40),
  //PBClock: generate('时钟', 'PBClock', comps.PBClock, comps.PBClockEditor),
  PBText: generate('文本', 'PBText', comps.PBText, comps.PBTextEditor, { title: '标题', text: '正文' }),
  PBTry: generate('试验品', 'PBTry', comps.PBTry, comps.PBTryEditor),
  //ECharts系列,共用一个组件,但为了方便演示,弄出一系列组件,通过初始值来区分
  PBBarChartByECharts: generate('柱图', 'PBBarChartByECharts', comps.PBECharts, comps.PBEChartsEditor,
    init.getInitLineBarChart('bar'), '基础图表', singleColumn),
  PBLineChartByECharts: generate('线图', 'PBLineChartByECharts', comps.PBECharts, comps.PBEChartsEditor,
    init.getInitLineBarChart('line'), '基础图表', singleLine),
  PBPieChartByECharts: generate('饼图', 'PBPieChartByECharts', comps.PBECharts, comps.PBEChartsEditor,
    init.getInitPieChart(), '基础图表', singlePie),
  PBScatterChartByECharts: generate('散点图', 'PBScatterChartByECharts', comps.PBECharts, comps.PBEChartsEditor,
    init.getInitScatterChart(), '基础图表', singlePie),
  PBGaugeChartByECharts: generate('仪表盘', 'PBGaugeChartByECharts', comps.PBECharts, comps.PBEChartsEditor,
    init.getInitGaugeChart(), '基础图表'),
  PBMapChartByECharts: generate('地图', 'PBMapChartByECharts', comps.PBECharts, comps.PBEChartsEditor,
    init.getInitMapChart(), '基础图表', defaultImg, 45, 50),
  PBParallelChartByECharts: generate('平行坐标', 'PBParallelChartByECharts', comps.PBECharts, comps.PBEChartsEditor,
    init.getInitParallelChart(), '基础图表', defaultImg, 40, 40),
  PBHeatChartByECharts: generate('热力矩阵', 'PBHeatChartByECharts', comps.PBECharts, comps.PBEChartsEditor,
    init.getInitHeatChart(), '基础图表', defaultImg, 54, 40),
  //D3系列
};
