/**
 * Created by liekkas on 15/12/17.
 */
import { GlobalActionTypes } from '../constants/ActionTypes';
import { fromJS } from 'immutable';

const initState = fromJS({
  theme: 'TealTheme',
  screenRatio: '16:9',
  screenNums: '2*4',
  user: {
    id: 'No10000',
    name: '斜风细雨',
    role: 'admin',
  }
});

export default function globalReducer(state = initState, action = {}) {
  switch (action.type) {
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
