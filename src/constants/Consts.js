/**
 * Created by liekkas on 16/1/5.
 */
import React from 'react';
import { MenuItem } from 'material-ui';
import festival from '../images/covers/festival.png';
import event from '../images/covers/event.png';
import flood from '../images/covers/flood.png';
import key from '../images/covers/key.png';

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

//加载效果样式
//详情见http://jonjaques.github.io/react-loaders/
export const loadingStyles = {
  ballPulse: 'ball-pulse',
  ballPulseSync: 'ball-pulse-sync',
  ballScale: 'ball-scale',
  ballRotate: 'ball-rotate',
  ballClipRotate: 'ball-clip-rotate',
  ballClipRotatePulse: 'ball-clip-rotate-pulse',
  ballClipRotateMultiple: 'ball-clip-rotate-multiple',
  ballScaleRipple: 'ball-scale-ripple',
  ballScaleRippleMultiple: 'ball-scale-ripple-multiple',
  ballBeat: 'ball-beat',
  ballScaleMultiple: 'ball-scale-multiple',
  ballTriangleTrace: 'ball-triangle-trace',
  ballPulseRise: 'ball-pulse-rise',
  ballGridBeat: 'ball-grid-beat',
  ballGridPulse: 'ball-grid-pulse',
  ballSpinFadeLoader: 'ball-spin-fade-loader',
  ballSpinLoader: 'ball-spin-loader',
  ballZigZag: 'ball-zig-zag',
  ballZigZagDeflect: 'ball-zig-zag-deflect',
  lineScale: 'line-scale',
  lineScaleRandom: 'line-scale-random',
  lineScalePulseOut: 'line-scale-pulse-out',
  lineScalePulseOutRapid: 'line-scale-pulse-out-rapid',
  lineSpinFadeLoader: 'line-spin-fade-loader',
  triangleSkewSpin: 'triangle-skew-spin',
  SquareSpin: 'square-spin',
  pacman: 'pacman',
  cubeTransition: 'cube-transition',
  semiCircleSpin: 'semi-circle-spin',
};
