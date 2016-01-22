/**
 * Created by liekkas on 16/1/22.
 */
import { Colors, Spacing } from 'material-ui/lib/styles';

export function generateEChartsTheme(colors,bgColor) {
  return {
    color: colors,
    backgroundColor: bgColor,
  }
}

export function generateMaterialTheme() {
  return {
    fontFamily: 'Roboto, sans-serif',
    spacing: Spacing,
    zIndex: {
      layer: 20,
      popover: 20,
    },
  }
}
