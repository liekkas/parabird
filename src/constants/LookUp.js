/**
 * Created by liekkas on 15/12/29.
 */
import * as comps from '../components';
import defaultImg from '../images/compsnaps/default.png';
import image from '../images/compsnaps/image.png';
import singleLine from '../images/compsnaps/singleLine.png';


export const Lookup = {
  LineChart: { name: '线状图', comp: comps.LineChart, editor: comps.LineChartEditor, img: singleLine, },
  PBImage: { name: '图片', comp: comps.PBImage, editor: comps.PBImageEditor, img: image, },
  PBClock: { name: '时钟', comp: comps.PBClock, editor: comps.PBClockEditor, img: defaultImg, },
};
