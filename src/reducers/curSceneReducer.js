/**
 * Created by liekkas on 15/12/17.
 */
import { ActionTypes } from '../actions';
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
  theme: 'DefaultTheme',
  placers: [],
});

export default function curSceneReducer(state = initState, action = {}) {
  switch (action.type) {
    case ActionTypes.INIT_USER:
      return state.update('createUser', () => action.payload);
    case ActionTypes.INIT_SCENE:
      return state.merge(action.payload.curScene);
    case ActionTypes.NEW_SCENE:
      return state.merge(initState)
        .update('id', () => createUniqueId('Scene'));
    case ActionTypes.SAVE_SCENE:
      return state.merge(action.payload);
    case ActionTypes.THEME_CHANGED: //主题变化同时也改变当前场景的主题
      return state.update('theme', () => action.payload);
    case ActionTypes.DRAG_COMPONENT_INTO_WORKSPACE:
      return state.update('placers', () => state.get('placers').push(fromJS(action.payload)));
    //上面保存位置,下面保存配置,逻辑都是一样,合并处理了
    case ActionTypes.DRAG_PLACER_ON_WORKSPACE:
    case ActionTypes.SAVE_COMPONENT_CONFIG:
      const index = state.get('placers').findIndex(item => item.get('name') === action.payload.name);
      return state.update('placers', () => state.get('placers').update(index, (item) => item.merge(fromJS(action.payload))));
    case ActionTypes.REMOVE_PLACER_FROM_WORKSPACE:
      const i = state.get('placers').findIndex(item => item.get('name') === action.payload);
      return state.update('placers', () => state.get('placers').remove(i));
    case ActionTypes.EDIT_SCENE:
      return fromJS(action.payload);
    //如果删除的场景是当前curScene那么就相当于新建,不是就什么也没发生
    case ActionTypes.DELETE_SCENE:
      return state.get('id') === action.payload ? state.merge(initState)
        .update('id', () => createUniqueId('Scene')) : state;
    //如果删除的场景组包括当前curScene,那么逻辑跟上面一样
    case ActionTypes.DELETE_GROUP:
      return state.get('group') === action.payload ? state.merge(initState)
        .update('id', () => createUniqueId('Scene')) : state;
    default:
      return state;
  }
}
