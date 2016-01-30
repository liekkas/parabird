/**
 * Created by liekkas on 15/12/17.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import appReducer from '../reducers';
import { Map } from 'immutable';

const finalCreateStore = compose(
  //applyMiddleware(thunk, api),
  //reduxReactRouter({ routes, createHistory }),
  //applyMiddleware(createLogger()),
  require('../containers/DevTools').default.instrument()
)(createStore);

export default function configureStore (initialState = {}) {
  const store = __DEV__
    ? finalCreateStore(appReducer, Map(initialState))
    : createStore(appReducer)
  return store
}

