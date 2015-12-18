import { Colors,Spacing } from 'material-ui/lib/styles';
import { ColorManipulator } from 'material-ui/lib/utils';

/*
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  zIndex: {
    layer: 20,
    popover: 20,
  },
  palette: {
    primary1Color: Colors.blue400,
    primary2Color: Colors.blue400,
    primary3Color: Colors.blue400,
    accent1Color: Colors.blue500,
    accent2Color: Colors.blue500,
    accent3Color: Colors.blue500,
    textColor: Colors.blue200,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.orange500,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.orange500,
    clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
  },

  appTheme: {
    toolbarBgColor: Colors.teal500, //工具栏
    compsBoxBgColor: Colors.teal500, // 组件库
    workspaceBgColor: Colors.teal500, //工作区
  }
};
