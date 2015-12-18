/**
 * Created by liekkas on 15/12/17.
 */
import { RedTheme, BlueTheme, YellowTheme, TealTheme } from '../styles';
import { ThemeManager } from 'material-ui/lib/styles';

export function getThemeByName(themeName) {
  let theme;
  switch (themeName) {
    case 'RedTheme':
      theme = RedTheme;
      break;
    case 'BlueTheme':
      theme = BlueTheme;
      break;
    case 'YellowTheme':
      theme = YellowTheme;
      break;
    default:
      theme = TealTheme;
  }

  return {
    'muiTheme': ThemeManager.getMuiTheme(theme),
    'appTheme': theme.appTheme,
  };
}
