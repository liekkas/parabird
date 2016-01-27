/**
 * Created by liekkas on 15/12/31.
 */
import fetch from 'isomorphic-fetch';
import { createAction, ActionTypes } from '../actions';

const BASE_URL = 'http://localhost:4000/api/v1/parabirds/';

export function getParabird(name) {
  fetch(BASE_URL + name)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      return json;
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
}

export function saveParabird(name, config, dispatch) {
  console.log('>>> services:saveParabird');
  fetch(BASE_URL, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      config: config,
    })
  }).then(function () {
    dispatch(createAction(ActionTypes.SAVE_SUCCESS));
  })
  .catch(function (ex) {
    dispatch(createAction(ActionTypes.SAVE_FAILURE));
  });
}
export function updateParabird(name, config, dispatch) {
  console.log('>>> services:updateParabird');
  fetch(BASE_URL + name, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      config: config,
    })
  }).then(function () {
      console.log('>>> services:updateParabird 成功!');
    dispatch(createAction(ActionTypes.SAVE_SUCCESS));
  })
  .catch(function (ex) {
    console.log('>>> services:updateParabird 失败:', ex);
    dispatch(createAction(ActionTypes.SAVE_FAILURE));
  });
}

export function getSceneById(userName, sceneId) {
  return fetch(BASE_URL + userName + '/' + sceneId)
    .then(function (response) {
      //console.log('>>> getSceneById1:', response.json());
      return response.json();
    })
    .then(function (result) {
      console.log('>>> getSceneById2:', result);
      return result;
    })
    .catch(function (ex) {
      console.log(ex);
    });
}
