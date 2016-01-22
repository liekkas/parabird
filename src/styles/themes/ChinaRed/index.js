/**
 * Created by liekkas on 16/1/22.
 */
import { Colors, Spacing } from 'material-ui/lib/styles';
import { generateEChartsTheme, generateMaterialTheme } from '../helper';
import bg from './../../../images/red_bg.png';

//调色板
const colors = ['#d8361b','#f16b4c','#f7b4a9','#d26666', '#99311c','#c42703','#d07e75'];
//组件背景
const compBgColor = 'rgba(255,0,0,0.2)';
//场景背景
const sceneBg = {
  backgroundColor: Colors.red200,
  //backgroundImage: 'url(http://7xkjpz.com1.z0.glb.clouddn.com/bg.png)',
  //backgroundRepeat: 'no-repeat',
  //backgroundSize: 'cover',
};

export default {
  //通用配置
  common: {
    sceneBg
  },
  echarts: generateEChartsTheme(colors,compBgColor),
};
