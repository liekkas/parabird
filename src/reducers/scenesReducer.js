/**
 * Created by liekkas on 15/12/17.
 */
import { ScenesActionTypes, CurSceneActionTypes } from '../constants/ActionTypes';
import { fromJS } from 'immutable';
import { createUniqueId } from '../tools/ztools';
import _ from 'lodash';

const initState = fromJS({
  groups: [
    { name: '未分组', createDate: '', createUser: '', updateDate: '' },
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

      let t = state;

      //场景组处理
      if (index > -1) {
        t = t.update('groups', () => t.get('groups').update(index, (item) => {
          let v = item.update('createUser', () => action.payload.createUser);
          v = v.update('updateDate', () => action.payload.updateDate);
          if (v.get('createDate') === '') {
            v = v.update('createDate', () => action.payload.updateDate);
          }
          return v;
        }));
      } else {
        const newGroup = { name: action.payload.group, createDate: action.payload.updateDate, createUser: action.payload.createUser, updateDate: action.payload.updateDate };
        t = t.update('groups', () => t.get('groups').push(fromJS(newGroup)));
      }

      //场景处理
      if (rowIndex > -1) {
        //找到原来的组
        const oldGroup = state.get('entries').getIn([rowIndex, 'group']);
        const oldGroupIndex = state.get('groups').findIndex(item => item.get('name') === oldGroup);
        //更新原来组的修改时间
        if (oldGroupIndex > -1) {
          t = t.update('groups', () => t.get('groups').update(oldGroupIndex, (item) => item.update('updateDate', () => action.payload.updateDate)));
        }

        return t.update('entries', () => t.get('entries').update(rowIndex, (item) => item.merge(fromJS(action.payload))));
      //新增场景组
      }
      return t.update('entries', () => t.get('entries').push(fromJS(action.payload)));
    default:
      return state;
  }
}
