/**
 * Created by liekkas on 15/12/17.
 */
import { ActionTypes } from '../actions';
import { fromJS } from 'immutable';

const initState = fromJS({
  theme: 'DefaultTheme',
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
    case ActionTypes.INIT_SCENE:
      return state.updateIn(['user', 'configed'], () => true)
                  .update('theme', () => action.payload.curScene.theme);
    case ActionTypes.SAVE_SCENE:
    case ActionTypes.DELETE_GROUP:
    case ActionTypes.DELETE_SCENE:
      return state.update('needSave', () => true);
    case ActionTypes.SAVE_SUCCESS:
    case ActionTypes.SAVE_FAILURE:
      return state.update('needSave', () => false);
    case ActionTypes.THEME_CHANGED:
      return state.update('theme', () => action.payload);
    case ActionTypes.SCREEN_RATIO_CHANGED:
      return state.update('screenRatio', () => action.payload);
    case ActionTypes.SCREEN_NUMS_CHANGED:
      return state.update('screenNums', () => action.payload);
    //编辑场景时把主题也带过来
    case ActionTypes.EDIT_SCENE:
      return state.update('theme', () => action.payload.theme);
    default:
      return state;
  }
}
