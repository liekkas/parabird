/**
 * Created by liekkas on 15/12/17.
 */
import { GlobalActionTypes, CurSceneActionTypes } from '../constants/ActionTypes';
import { fromJS } from 'immutable';
import { createUniqueId } from '../tools/ztools';

const initState = fromJS({
  id: createUniqueId('Scene'),
  group: '未分组',
  name: '未命名',
  cover: '',
  state: 'unsaved',
  desc: '',
  createDate: '',
  updateDate: '',
  createUser: '',
  theme: 'TealTheme',
  placers: [],
});

export default function curSceneReducer(state = initState, action = {}) {
  switch (action.type) {
    case GlobalActionTypes.INIT_USER:
      return state.update('createUser', () => action.payload);
    case CurSceneActionTypes.INIT_SCENE:
      return state.merge(action.payload.curScene);
    case CurSceneActionTypes.NEW_SCENE:
      return state.merge(initState)
        .update('id', () => createUniqueId('Scene'))
        .update('createUser', () => action.payload);
    case CurSceneActionTypes.SAVE_SCENE:
      return state.merge(action.payload);
    case GlobalActionTypes.THEME_CHANGED: //主题变化同时也改变当前场景的主题
      return state.update('theme', () => action.payload);
    case CurSceneActionTypes.PREVIEW_SCENE:
      return state;
    case CurSceneActionTypes.DRAG_COMPONENT_INTO_WORKSPACE:
      return state.update('placers', () => state.get('placers').push(fromJS(action.payload)));
    //上面保存位置,下面保存配置,逻辑都是一样,合并处理了
    case CurSceneActionTypes.DRAG_PLACER_ON_WORKSPACE:
    case CurSceneActionTypes.SAVE_COMPONENT_CONFIG:
      const index = state.get('placers').findIndex(item => item.get('name') === action.payload.name);
      return state.update('placers', () => state.get('placers').update(index, (item) => item.merge(fromJS(action.payload))));
    case CurSceneActionTypes.REMOVE_PLACER_FROM_WORKSPACE:
      const i = state.get('placers').findIndex(item => item.get('name') === action.payload);
      return state.update('placers', () => state.get('placers').remove(i));
    case CurSceneActionTypes.EDIT_SCENE:
      return state.find(item => item.get('id') === action.payload);
    default:
      return state;
  }
}