/**
 * Created by liekkas on 15/12/17.
 */
import { CurSceneActionTypes } from '../constants/ActionTypes';
import { fromJS } from 'immutable';
import { createUniqueId } from '../tools/ztools';

const initState = fromJS({
  id: createUniqueId('Scene'),
  group: '',
  name: '未命名',
  state: 'unsaved',
  desc: '',
  createDate: '',
  createUser: '',
  theme: 'TealTheme',
  placers: [],
});

export default function curSceneReducer(state = initState, action = {}) {
  switch (action.type) {
    case CurSceneActionTypes.NEW_SCENE:
      return state.merge(initState).update('id', id => createUniqueId('Scene'));
    case CurSceneActionTypes.SAVE_SCENE:
      return state.merge(action.payload);
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
