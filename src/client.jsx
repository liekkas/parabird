/**
 * Created by liekkas on 15/12/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routes';
import { Router } from 'react-router';
import './styles/common.scss';
import configureStore from './store/configureStore';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import { changeTheme } from './actions';

//import 'styles/vendor/css/material-design-iconic-font.min.css';

//const store = configureStore();
const store = createStore(appReducer);
//store.dispatch(changeTheme('RedTheme'));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {AppRouter}
    </Router>
  </Provider>,

  document.getElementById('root')
);
