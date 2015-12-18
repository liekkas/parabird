/**
 * Created by liekkas on 15/12/17.
 */
import { combineReducers } from 'redux';
import globalReducer from './globalReducer';

const appReducer = combineReducers({
  globalReducer
});

export default appReducer;
