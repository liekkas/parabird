/**
 * Created by liekkas on 15/12/29.
 */
import * as comps from '../components';
import defaultImg from '../images/compsnaps/default.png';
import image from '../images/compsnaps/image.png';
import singleLine from '../images/compsnaps/singleLine.png';
import singleColumn from '../images/compsnaps/singleColumn.png';

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
function getInitBarChart() {
  return {
    'title': '性能TopN',
    'subTitle': '从1号到31号',
    'legend': ['最高值', '最低值'],
    'labels': ['周一', '周二', '周三', '周四', '周五'],
    '最高值': [20, 30, 32, 40, 50],
    '最低值': [10, 20, 22, 30, 40],
  };
}

/**
 * 组件字典
 */
export const Lookup = {
  LineChart: generate('线图', comps.LineChart, comps.LineChartEditor, singleLine, { title: '线状图' }),
  PBBarChart: generate('柱图', comps.PBBarChart, comps.PBBarChartEditor, singleColumn, getInitBarChart()),
  PBImage: generate('图片', comps.PBImage, comps.PBImageEditor, image, {}, 40),
  PBClock: generate('时钟', comps.PBClock, comps.PBClockEditor, defaultImg),
  PBText: generate('文本', comps.PBText, comps.PBTextEditor, defaultImg, { title: '标题', text: '正文' }),
  PBTry: generate('试验品', comps.PBTry, comps.PBTryEditor, defaultImg, { }),

  //ECharts
  PBBarChartByECharts: generate('柱图', comps.PBBarChartByECharts, comps.PBBarChartEditorByECharts, singleColumn, getInitBarChart()),

};
