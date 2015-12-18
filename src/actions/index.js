/**
 * Created by liekkas on 15/12/17.
 */

export const THEME_CHANGED = 'THEME_CHANGED';

/**
 * 更换主题
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function changeTheme(theme) {
  return {
    type: THEME_CHANGED,
    payload: theme
  };
}
