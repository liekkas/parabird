/**
 * Created by liekkas on 16/1/22.
 */
import { Colors, Spacing } from 'material-ui/lib/styles';
import { generateEChartsTheme, generateMaterialTheme } from '../helper';

//调色板
const colors = ['#1790cf','#1bb2d8','#99d2dd','#88b0bb', '#1c7099','#038cc4','#75abd0','#afd6dd'];
//组件背景
const compBgColor = 'rgba(0,0,255,0.2)';
//场景背景
const sceneBg = {
  backgroundColor: Colors.blue200,
  //backgroundImage: 'url(http://7xkjpz.com1.z0.glb.clouddn.com/spaceblueBg.png)',
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
