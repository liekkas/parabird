/**
 * Created by liekkas on 15/12/17.
 */
import { ScenesActionTypes } from '../constants/ActionTypes';
import { fromJS } from 'immutable';
import { createUniqueId } from '../tools/ztools';
import _ from 'lodash';

const initState = fromJS({
  groups: [
    { name: '未启用', createDate: '', createUser: '' },
  ],
  entries: [],
});

export default function scenesReducer(state = initState, action = {}) {
  switch (action.type) {
    case ScenesActionTypes.GET_SCENES_BY_GROUP:
      const result = _.groupBy(state.get('entries').toJS(), 'group');
      return fromJS(result);
    default:
      return state;
  }
}
