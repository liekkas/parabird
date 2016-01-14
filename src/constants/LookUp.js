/**
 * Created by liekkas on 15/12/29.
 */
import * as comps from '../components';
import defaultImg from '../images/compsnaps/default.png';
import image from '../images/compsnaps/image.png';
import singleLine from '../images/compsnaps/singleLine.png';

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

/**
 * 组件字典
 */
export const Lookup = {
  LineChart: generate('线状图', comps.LineChart, comps.LineChartEditor, singleLine),
  PBImage: generate('图片', comps.PBImage, comps.PBImageEditor, image, {}, 40),
  PBClock: generate('时钟', comps.PBClock, comps.PBClockEditor, defaultImg),
  PBText: generate('文本', comps.PBText, comps.PBTextEditor, defaultImg, { text: '文本组件' }),
};
