/**
 * Created by liekkas on 15/12/31.
 */
import fetch from 'isomorphic-fetch';
import { createAction, ActionTypes } from '../actions';
import { REST_API_BASE_URL } from '../config';

export function getParabird(name) {
  fetch(REST_API_BASE_URL + name)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      //console.log(json);
      return json;
    }).catch(function(ex) {
      //console.log('parsing failed', ex);
    });
}

export function saveParabird(name, config, dispatch) {
  console.log('>>> services:saveParabird');
  fetch(REST_API_BASE_URL, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, config})
  }).then(function () {
    dispatch(createAction(ActionTypes.SAVE_SUCCESS));
  })
  .catch(function (ex) {
    dispatch(createAction(ActionTypes.SAVE_FAILURE));
  });
}
export function updateParabird(name, config, dispatch) {
  console.log('>>> services:updateParabird');
  fetch(REST_API_BASE_URL + name, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, config})
  }).then(function () {
    //console.log('>>> services:updateParabird 成功!');
    dispatch(createAction(ActionTypes.SAVE_SUCCESS));
  })
  .catch(function (ex) {
    //console.log('>>> services:updateParabird 失败:', ex);
    dispatch(createAction(ActionTypes.SAVE_FAILURE));
  });
}

export function getSceneById(userName, sceneId) {
  return fetch(REST_API_BASE_URL + userName + '/' + sceneId)
    .then(function (response) {
      //console.log('>>> getSceneById1:', response.json());
      return response.json();
    })
    .then(function (result) {
      //console.log('>>> getSceneById2:', result);
      return result;
    })
    .catch(function (ex) {
      console.log(ex);
    });
}
