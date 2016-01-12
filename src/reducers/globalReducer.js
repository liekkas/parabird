/**
 * Created by liekkas on 15/12/17.
 */
import { GlobalActionTypes, CurSceneActionTypes, ScenesActionTypes } from '../constants/ActionTypes';
import { fromJS } from 'immutable';

const initState = fromJS({
  theme: 'TealTheme',
  screenRatio: '16:9',
  screenNums: '2*4',
  liveSave: false, //实时保存,拖拽啥的立马就存上
  needSave: false, //是否需要保存
  user: {
    id: 'No10000',
    name: 'root',
    role: 'admin',
    configed: false, //该帐号下是否有配置文件
  }
});

export default function globalReducer(state = initState, action = {}) {
  switch (action.type) {
    case CurSceneActionTypes.INIT_SCENE:
      return state.updateIn(['user', 'configed'], () => true);
    case CurSceneActionTypes.SAVE_SCENE:
    case ScenesActionTypes.DELETE_GROUP:
    case ScenesActionTypes.DELETE_SCENE:
      return state.update('needSave', () => true);
    case CurSceneActionTypes.SAVE_SUCCESS:
    case CurSceneActionTypes.SAVE_FAILURE:
      return state.update('needSave', () => false);
    case GlobalActionTypes.THEME_CHANGED:
      return state.update('theme', () => action.payload);
    case GlobalActionTypes.SCREEN_RATIO_CHANGED:
      return state.update('screenRatio', () => action.payload);
    case GlobalActionTypes.SCREEN_NUMS_CHANGED:
      return state.update('screenNums', () => action.payload);
    default:
      return state;
  }
}
