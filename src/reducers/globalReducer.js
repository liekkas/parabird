/**
 * Created by liekkas on 15/12/17.
 */
import { THEME_CHANGED } from '../actions';
import { Map } from 'immutable';

const initState = Map({
  theme: 'TealTheme'
});

export default function globalReducer(state = initState, action = {}) {
  switch (action.type) {
    case THEME_CHANGED:
      return state.update('payload', payload => action.payload);
    default:
      return state;
  }
}
