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
 * @param img 组件库中的图标
 * @param w 组件默认宽度占比 如 30 即可视窗口的30%
 * @param h 组件默认高度占比
 * @param initConfig 组件初始设置值
 */
function generate(name, comp, editor, img, initConfig = {}, w = 30, h = 30) {
  return { name, comp, editor, img, initConfig, w, h };
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

/**
 * 组件字典
 */
export const Lookup = {
  PBImage: generate('图片', comps.PBImage, comps.PBImageEditor, image, {}, 40),
  PBClock: generate('时钟', comps.PBClock, comps.PBClockEditor, defaultImg),
  PBText: generate('文本', comps.PBText, comps.PBTextEditor, defaultImg, { title: '标题', text: '正文' }),
  PBTry: generate('试验品', comps.PBTry, comps.PBTryEditor, defaultImg, { }),

  //ECharts
  PBBarChartByECharts: generate('柱图', comps.PBBarChartByECharts, comps.PBBarChartEditorByECharts, singleColumn, getInitBarChart()),
  PBLineChartByECharts: generate('线图', comps.PBLineChartByECharts, comps.PBLineChartEditorByECharts, singleLine, getInitBarChart()),
  PBPieChartByECharts: generate('饼图', comps.PBPieChartByECharts, comps.PBPieChartEditorByECharts, singlePie, getInitPieChart()),

};
