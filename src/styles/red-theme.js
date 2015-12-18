import { Colors, Spacing } from 'material-ui/lib/styles';
import { ColorManipulator } from 'material-ui/lib/utils';

/*
 *  红色主题, appTheme部分是应用其他组件设置,其他是mui主题设置
 */

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  zIndex: {
    layer: 20,
    popover: 20,
  },
  palette: {
    primary1Color: Colors.pink400,
    primary2Color: Colors.green500,
    primary3Color: Colors.red500,

    accent1Color: Colors.lightGreen500,
    accent2Color: Colors.blue500,
    accent3Color: Colors.blue500,
    textColor: Colors.white,
    alternateTextColor: Colors.white,
    canvasColor: Colors.red300,
    borderColor: Colors.orange500,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.orange500,
    clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
  },

  appTheme: {
    toolbarBgColor: Colors.red500, //工具栏
    compsBoxBgColor: Colors.red400, // 组件库
    workspaceBgColor: Colors.red200, //工作区
  }
};
