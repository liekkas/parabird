/**
 * Created by liekkas on 15/12/17.
 */
import { ScenesActionTypes, CurSceneActionTypes } from '../constants/ActionTypes';
import { fromJS } from 'immutable';
import { createUniqueId } from '../tools/ztools';
import _ from 'lodash';

const initState = fromJS({
  groups: [
    { name: '未分组', createDate: '', createUser: '', scenesNum: 0 },
  ],
  entries: [],
});

export default function scenesReducer(state = initState, action = {}) {
  switch (action.type) {
    case CurSceneActionTypes.INIT_SCENE:
      return state.merge(action.payload.scenes);
    case ScenesActionTypes.GET_SCENES_BY_GROUP:
      const result = _.groupBy(state.get('entries').toJS(), 'group');
      return fromJS(result);
    case CurSceneActionTypes.SAVE_SCENE: //保存当前场景时同时更新场景组里面的内容
      //组所在索引
      const index = state.get('groups').findIndex(item => item.get('name') === action.payload.group);
      //场景所在索引
      const rowIndex = state.get('entries').findIndex(item => item.get('id') === action.payload.id);
      let t;
      if (index > -1) {
        t = state.update('groups', () => state.get('groups').update(index, (item) => item.update('scenesNum', (v) => ++ v)));
        //查看scene是否已经存在,存在的话覆盖即可
        if (rowIndex > -1) {
          return state.update('entries', () => state.get('entries').update(index, (item) => item.merge(fromJS(action.payload))));
        }
      } else {
        const newGroup = { name: action.payload.group, createDate: action.payload.createDate, createUser: action.payload.createUser, scenesNum: 1 };
        t = state.update('groups', () => state.get('groups').push(fromJS(newGroup)));

        if (rowIndex > -1) {
          //找到原来的组,并更新群组信息
          const oldGroup = state.get('entries').getIn([rowIndex, 'group']);
          const oldGroupIndex = state.get('groups').findIndex(item => item.get('name') === oldGroup);
          t = t.update('groups', () => t.get('groups').update(oldGroupIndex, (item) => item.update('scenesNum', (v) => -- v)));

          return t.update('entries', () => state.get('entries').update(index, (item) => item.merge(fromJS(action.payload))));
        }
      }

      //直接新增
      return t.update('entries', () => t.get('entries').push(fromJS(action.payload)));
    default:
      return state;
  }
}
