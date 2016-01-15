/**
 * Created by liekkas on 15/12/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routes';
import { Router } from 'react-router';
import './styles/common.scss';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'loaders.css/loaders.min.css';
//import 'antd/lib/index.css';
import configureStore from './store/configureStore';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import globalReducer from './reducers/globalReducer';
import { Provider } from 'react-redux';
import DevTools from './tools/DevTools';
import { createHistory } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import { createAction } from './actions';
import { GlobalActionTypes, CurSceneActionTypes, ScenesActionTypes } from './constants/ActionTypes';

const store = configureStore();

fetch('http://localhost:4000/api/v1/parabirds/root')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log('parsed json', json);
    if (json.hasOwnProperty('curScene')) {
      store.dispatch(createAction(CurSceneActionTypes.INIT_SCENE, json));
    }
    store.dispatch(createAction(GlobalActionTypes.INIT_USER, 'root'));
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });

//const store = createStore(globalReducer);
//const store = configureStore();
//const history = createHistory();

//syncReduxAndRouter(history, store);


if (__DEV__) {
  //const showDevTools = require('./tools/showDevTools');
  //showDevTools(store);
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router>
          {AppRouter}
        </Router>
        <DevTools />
      </div>
    </Provider>,

    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        {AppRouter}
      </Router>
    </Provider>,

    document.getElementById('root')
  );
}

