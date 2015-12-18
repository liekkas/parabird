/**
 * Created by liekkas on 15/12/17.
 */
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducer from '../reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export const store = createStoreWithMiddleware(reducer);
