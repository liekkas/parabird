/**
 * Created by liekkas on 15/12/17.
 */
import { combineReducers } from 'redux-immutablejs';
import globalReducer from './globalReducer';
import curSceneReducer from './curSceneReducer';
import scenesReducer from './scenesReducer';

const appReducer = combineReducers({
  global: globalReducer,
  curScene: curSceneReducer,
  scenes: scenesReducer,
});

export default appReducer;
