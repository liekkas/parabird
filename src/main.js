/**
 * Created by liekkas on 15/12/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes';
import Root from './containers/Root';
import './styles/common.scss';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'loaders.css/loaders.min.css';
import '../vendors/react-sanfona.css'
//import 'antd/lib/index.css';
import configureStore from './store/configureStore';
import { createAction, ActionTypes } from './actions';
import { REST_API_BASE_URL } from './config';
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'

const historyConfig = { basename: __BASENAME__ }
const history = useRouterHistory(createHistory)(historyConfig)
//
//const initialState = window.__INITIAL_STATE__
const store = configureStore()

fetch(REST_API_BASE_URL + 'root')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log('parsed json', json);
    if (json.hasOwnProperty('curScene')) {
      store.dispatch(createAction(ActionTypes.INIT_SCENE, json));
    }
    store.dispatch(createAction(ActionTypes.INIT_USER, 'root'));
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });

ReactDOM.render(
  <Root history={history} route={AppRouter} store={store} />,
  document.getElementById('root')
)

