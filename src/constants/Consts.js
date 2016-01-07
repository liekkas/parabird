/**
 * Created by liekkas on 16/1/5.
 */
import React from 'react';
import { MenuItem } from 'material-ui';
import festival from '../images/festival.png';
import event from '../images/event.png';
import flood from '../images/flood.png';
import key from '../images/key.png';

//export const themes = [
//  { payload: 'TealTheme', text: '主题:青葱少年' },
//  { payload: 'RedTheme', text: '主题:红色风暴' },
  //{ payload: 'TealTheme', text: '主题:青葱少年' },
  //{ payload: 'BlueTheme', text: '主题:深空蓝' },
//];

export const themes = [
  <MenuItem key={1} value="TealTheme" primaryText="青葱少年"/>,
  <MenuItem key={2} value="RedTheme" primaryText="红色风暴"/>,
];

//场景封面图
export const screenCoverImages = [
  { name: '春节', img: festival },
  { name: '烟火', img: event },
  { name: '城市内涝', img: flood },
  { name: '天际线', img: key },
];

export const screenRatios = [
  { payload: '16:9', text: '单屏占比16:9' },
  { payload: '16:10', text: '单屏占比16:10' },
  { payload: '4:3', text: '单屏占比4:3' },
  { payload: '5:4', text: '单屏占比5:4' },
  //{ payload: '1:1', text: '单屏占比1:1' },
];

export const screenNums = [
  { payload: '2*4', text: '屏幕数2*4' },
  { payload: '2*2', text: '屏幕数2*2' },
  { payload: '2*6', text: '屏幕数2*6' },
  { payload: '4*6', text: '屏幕数4*6' },
  { payload: '1*1', text: '屏幕数1*1' },
];
