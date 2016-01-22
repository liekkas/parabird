/**
 * Created by liekkas on 15/12/17.
 */
import { ChinaRed, UniverseBlue, YellowTheme, TealTheme } from '../styles';
import { ThemeManager } from 'material-ui/lib/styles';

export function getThemeByName(themeName) {
  let theme;
  switch (themeName) {
    case 'UniverseBlue':
      theme = UniverseBlue;
      break;
    case 'ChinaRed':
      theme = ChinaRed;
      break;
    default:
      theme = UniverseBlue;
  }

  return theme;
}
