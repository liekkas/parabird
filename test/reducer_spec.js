/**
 * Created by liekkas on 15/12/8.
 */
import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { GlobalActionTypes, CurSceneActionTypes, ScenesActionTypes } from '../src/constants/ActionTypes';
import globalReducer from '../src/reducers/globalReducer';
import curSceneReducer from '../src/reducers/curSceneReducer';
import scenesReducer from '../src/reducers/scenesReducer';
import dateformat from 'dateformat';

//全局Reducer测试
describe('globalReducer', ()=> {
  it('handle THEME_CHANGED', ()=> {
    const initialState = fromJS({
      theme: 'TealTheme',
      screenRatio: '16:9',
      screenNums: '2*4',
      user: {
        id: 'No10000',
        name: '斜风细雨',
        role: 'admin',
      }
    });
    const action = {
      type: GlobalActionTypes.THEME_CHANGED,
      payload: 'RedTheme'
    };
    const nextState = globalReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      theme: 'RedTheme',
      screenRatio: '16:9',
      screenNums: '2*4',
      user: {
        id: 'No10000',
        name: '斜风细雨',
        role: 'admin',
      }
    }));
  });
});

//当前场景Reducer测试
describe('curSceneReducer', ()=> {
  it('handle INIT_USER', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '',
      createUser: '',
      theme: 'TealTheme',
      placers: [],
    });
    const action = {
      type: GlobalActionTypes.INIT_USER,
      payload: 'root'
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '',
      createUser: 'root',
      theme: 'TealTheme',
      placers: [],
    }));
  });

  it('handle INIT_SCENE', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '',
      createUser: '',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {},
      }],
    });
    const action = {
      type: CurSceneActionTypes.INIT_SCENE,
      payload: {
        curScene: {
          id: 'Scene11',
          name: '未命名',
          desc: '',
          createDate: '111',
          createUser: '222',
          theme: 'TealTheme',
          placers: [{
            name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {},
          }],
        },
        scenes: {}
      }
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '111',
      createUser: '222',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {},
      }],
    }));
  });

  it('handle NEW_SCENE: From unsaved to Init', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '',
      createUser: '',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {},
      }],
    });
    const action = {
      type: CurSceneActionTypes.NEW_SCENE,
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState.get('name')).to.equal('未命名');
    expect(nextState.get('id')).not.to.equal(initialState.get('id'));
    expect(nextState.get('placers')).to.equal(fromJS([]));
  });

  it('handle SAVE_SCENE', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      name: '未命名',
      group: '未启用',
      cover: '',
      state: 'unsaved',
      desc: '',
      createDate: '',
      createUser: '',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {},
      }],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        name: '平安夜监控',
        desc: '这个夜晚不寻常',
        group: 'A',
        cover: '春节',
        state: 'saved',
        createDate: '2016/1/5',
      }
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      id: 'Scene11',
      name: '平安夜监控',
      cover: '春节',
      group: 'A',
      state: 'saved',
      desc: '这个夜晚不寻常',
      createDate: '2016/1/5',
      createUser: '',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {},
      }],
    }));
  });

  it('handle DRAG_COMPONENT_INTO_WORKSPACE: Init', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '',
      createUser: '',
      theme: 'TealTheme',
      placers: [],
    });
    const action = {
      type: CurSceneActionTypes.DRAG_COMPONENT_INTO_WORKSPACE,
      payload: {
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {},
      }
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState.get('placers')).to.equal(fromJS([{
      name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {},
    }]));
  });

  it('handle DRAG_COMPONENT_INTO_WORKSPACE: ing...', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '',
      createUser: '',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {}
      }],
    });
    const action = {
      type: CurSceneActionTypes.DRAG_COMPONENT_INTO_WORKSPACE,
      payload: {
        name: 'Placer2', x: 20, y: 10, w: 10, h: 20, componentType: 'LineChart', componentConfig: {},
      }
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState.get('placers')).to.equal(fromJS([
      { name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
      { name: 'Placer2', x: 20, y: 10, w: 10, h: 20, componentType: 'LineChart', componentConfig: {} },
    ]));

    expect(nextState.get('placers')).not.to.equal(fromJS([
      { name: 'Placer2', x: 20, y: 10, w: 10, h: 20, componentType: 'LineChart', componentConfig: {} },
      { name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
    ]));
  });

  it('handle DRAG_PLACER_ON_WORKSPACE', ()=> {
    const initialState = fromJS({
      placers: [
        { name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
        { name: 'Placer2', x: 20, y: 10, w: 10, h: 20, componentType: 'LineChart', componentConfig: {} },
      ],
    });
    const action = {
      type: CurSceneActionTypes.DRAG_PLACER_ON_WORKSPACE,
      payload: {
        name: 'Placer1', x: 30, y: 20, w: 10, h: 20,
      }
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState.get('placers')).to.equal(fromJS([
      { name: 'Placer1', x: 30, y: 20, w: 10, h: 20, componentType: 'LineChart', componentConfig: {} },
      { name: 'Placer2', x: 20, y: 10, w: 10, h: 20, componentType: 'LineChart', componentConfig: {} },
    ]));
  });

  //只更新config部分
  it('handle SAVE_COMPONENT_CONFIG', ()=> {
    const initialState = fromJS({
      placers: [
        { name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
        { name: 'Placer2', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
      ],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_COMPONENT_CONFIG,
      payload: {
        name: 'Placer1', componentConfig: { dataApi: 'http://www.baidu.com/rest', style: {} },
      }
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState.get('placers')).to.equal(fromJS([
      { name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: { dataApi: 'http://www.baidu.com/rest', style: {} } },
      { name: 'Placer2', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
    ]));
  });

  it('handle REMOVE_PLACER_FROM_WORKSPACE', ()=> {
    const initialState = fromJS({
      placers: [
        { name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
        { name: 'Placer2', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
      ],
    });
    const action = {
      type: CurSceneActionTypes.REMOVE_PLACER_FROM_WORKSPACE,
      payload: 'Placer1'
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState.get('placers')).to.equal(fromJS([
      { name: 'Placer2', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {} },
    ]));
  });

  //假如是正在编辑中的场景被删除了,对curScene相当于新建
  it('handle DELETE_SCENE: scene is curScene', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '2016-12-23',
      createUser: 'root',
      state: 'saved',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {}
      }],
    });
    const action = {
      type: ScenesActionTypes.DELETE_SCENE,
      payload: 'Scene11',
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState.get('name')).to.equal('未命名');
    expect(nextState.get('id')).not.to.equal(initialState.get('id'));
    expect(nextState.get('placers')).to.equal(fromJS([]));
    expect(nextState.get('state')).to.equal('unsaved');
  });

  //假如是正在编辑中的场景被删除了,对curScene相当于新建
  it('handle DELETE_SCENE: scene is not curScene', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '2016-12-23',
      createUser: 'root',
      state: 'saved',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {}
      }],
    });
    const action = {
      type: ScenesActionTypes.DELETE_SCENE,
      payload: 'Scene2',
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      id: 'Scene11',
      name: '未命名',
      desc: '',
      createDate: '2016-12-23',
      createUser: 'root',
      state: 'saved',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {}
      }],
    }));
  });

  it('handle DELETE_GROUP: the curScene in group', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      group: 'A',
      name: '未命名',
      desc: '',
      createDate: '2016-12-23',
      createUser: 'root',
      state: 'saved',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {}
      }],
    });
    const action = {
      type: ScenesActionTypes.DELETE_GROUP,
      payload: 'A',
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState.get('name')).to.equal('未命名');
    expect(nextState.get('id')).not.to.equal(initialState.get('id'));
    expect(nextState.get('placers')).to.equal(fromJS([]));
    expect(nextState.get('state')).to.equal('unsaved');
  });

  it('handle EDIT_SCENE', ()=> {
    const initialState = fromJS({
      id: 'Scene11',
      group: 'A',
      name: '未命名',
      desc: '',
      createDate: '2016-12-23',
      createUser: 'root',
      state: 'saved',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {}
      }],
    });
    const action = {
      type: CurSceneActionTypes.EDIT_SCENE,
      payload: {
        id: 'Scene12',
        group: 'B',
        name: '未命名',
        desc: 'haha',
        createDate: '2016-12-23',
        createUser: 'root',
        state: 'saved',
        theme: 'TealTheme',
        placers: [{
          name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {}
        }],
      },
    };
    const nextState = curSceneReducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      id: 'Scene12',
      group: 'B',
      name: '未命名',
      desc: 'haha',
      createDate: '2016-12-23',
      createUser: 'root',
      state: 'saved',
      theme: 'TealTheme',
      placers: [{
        name: 'Placer1', x: 10, y: 10, w: 10, h: 10, componentType: 'LineChart', componentConfig: {}
      }],
    }));
  });
});

//所有场景Reducer测试
describe('ScenesReducer', ()=> {
  it('handle INIT_SCENE', ()=> {
    const initialState = fromJS({
      groups: [
        { name: '未启用', createDate: '', createUser: '' },
      ],
      entries: [],
    });
    const action = {
      type: CurSceneActionTypes.INIT_SCENE,
      payload: {
        curScene: {},
        scenes: {
          groups: [
            { name: 'A', createDate: '', createUser: '' },
            { name: 'B', createDate: '', createUser: '' },
            { name: 'C', createDate: '', createUser: '' },
          ],
          entries: [
            { id: 'Scene1', group: 'A', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
            { id: 'Scene2', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
            { id: 'Scene3', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
            { id: 'Scene4', group: 'C', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
          ],
        }
      }
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: 'A', createDate: '', createUser: '' },
          { name: 'B', createDate: '', createUser: '' },
          { name: 'C', createDate: '', createUser: '' },
        ],
        entries: [
          { id: 'Scene1', group: 'A', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
          { id: 'Scene2', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
          { id: 'Scene3', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
          { id: 'Scene4', group: 'C', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle SAVE_SCENE: group aleady exist and first save scene', ()=> {
    const initialState = fromJS({
      groups: [
        { name: '未启用', createDate: '', createUser: '', updateDate: '' },
      ],
      entries: [],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2015-12-31', createUser: 'root', theme: 'TealTheme', placers: [],
      }
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2015-12-31' },
        ],
        entries: [
          { id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2015-12-31', createUser: 'root', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle SAVE_SCENE: update scene in the same group', ()=> {
    const initialState = fromJS({
      groups: [
        { name: '未启用', createDate: '2016-11-30', createUser: 'root', updateDate: '2016-11-30' },
      ],
      entries: [
        { id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2016-11-30', updateDate: '2016-11-30', createUser: 'root', theme: 'TealTheme', placers: [], }
      ],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        id: 'Scene1', group: '未启用', name: 'haha', desc: '', createDate: '2016-11-30', updateDate: '2016-12-4', createUser: 'root', theme: 'TealTheme', placers: [],
      }
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: '未启用', createDate: '2016-11-30', createUser: 'root', updateDate: '2016-12-4' },
        ],
        entries: [
          { id: 'Scene1', group: '未启用', name: 'haha', desc: '', createDate: '2016-11-30', updateDate: '2016-12-4', createUser: 'root', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle SAVE_SCENE: update scene from a group to another new group', ()=> {
    const initialState = fromJS({
      groups: [
        { name: '未启用', createDate: '2016-11-30', createUser: 'root', updateDate: '2016-11-30' },
      ],
      entries: [
        { id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2016-11-30', updateDate: '2016-11-30', createUser: 'root', theme: 'TealTheme', placers: [], }
      ],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        id: 'Scene1', group: 'A', name: 'haha', desc: '', createDate: '2016-11-30', updateDate: '2016-12-4', createUser: 'root', theme: 'TealTheme', placers: [],
      }
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: '未启用', createDate: '2016-11-30', createUser: 'root', updateDate: '2016-12-4' },
          { name: 'A', createDate: '2016-12-4', createUser: 'root', updateDate: '2016-12-4' },
        ],
        entries: [
          { id: 'Scene1', group: 'A', name: 'haha', desc: '', createDate: '2016-11-30', updateDate: '2016-12-4', createUser: 'root', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle SAVE_SCENE: new scene and multi groups exist', ()=> {
    const initialState = fromJS({
      groups: [
        {name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2016-12-31' },
        {name: 'A', createDate: '2017-12-31', createUser: 'root', updateDate: '2018-12-31' },
      ],
      entries: [
        { id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2016-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
        { id: 'Scene2', group: 'A', name: '未命名', desc: '', createDate: '2017-12-31', updateDate: '2018-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
      ],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        id: 'Scene3', group: 'A', name: '未命名', desc: '', createDate: '2020-12-31', updateDate: '2021-12-31', createUser: 'root', theme: 'TealTheme', placers: [],
      },
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          {name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2016-12-31' },
          {name: 'A', createDate: '2017-12-31', createUser: 'root', updateDate: '2021-12-31' },
        ],
        entries: [
          { id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2016-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
          { id: 'Scene2', group: 'A', name: '未命名', desc: '', createDate: '2017-12-31', updateDate: '2018-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
          { id: 'Scene3', group: 'A', name: '未命名', desc: '', createDate: '2020-12-31', updateDate: '2021-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
        ],
      }
    ));
  });

  it('handle SAVE_SCENE: group aleady exist and the scene exist', ()=> {
    const initialState = fromJS({
      groups: [
        { name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2016-12-31'},
      ],
      entries: [
        { id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2016-12-31', createUser: 'root', theme: 'TealTheme', placers: [], }
      ],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        id: 'Scene1', group: '未启用', name: 'AAA', desc: 'BBB', createDate: '2015-12-31', updateDate: '2017-12-31', createUser: 'root', theme: 'TealTheme', placers: [],
      }
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2017-12-31'},
        ],
        entries: [
          { id: 'Scene1', group: '未启用', name: 'AAA', desc: 'BBB', createDate: '2015-12-31', updateDate: '2017-12-31', createUser: 'root', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle SAVE_SCENE: new group', ()=> {
    const initialState = fromJS({
      groups: [
        { name: '未启用', createDate: '', createUser: '', updateDate: '' },
      ],
      entries: [],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        id: 'Scene1', group: 'A', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2016-12-31', createUser: 'root', theme: 'TealTheme', placers: [],
      }
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: '未启用', createDate: '', createUser: '', updateDate: '' },
          { name: 'A', createDate: '2016-12-31', createUser: 'root', updateDate: '2016-12-31' },
        ],
        entries: [
          { id: 'Scene1', group: 'A', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2016-12-31', createUser: 'root', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle SAVE_SCENE: new group and the scene exist', ()=> {
    const initialState = fromJS({
      groups: [
        { name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2016-12-31' },
      ],
      entries: [
        { id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2016-12-31', createUser: 'root', theme: 'TealTheme', placers: [], }
      ],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        id: 'Scene1', group: 'A', name: 'haha', desc: 'hehe', createDate: '2015-12-31', updateDate: '2017-12-31', createUser: 'root', theme: 'TealTheme', placers: [],
      }
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2017-12-31' },
          { name: 'A', createDate: '2017-12-31', createUser: 'root', updateDate: '2017-12-31' },
        ],
        entries: [
          { id: 'Scene1', group: 'A', name: 'haha', desc: 'hehe', createDate: '2015-12-31', updateDate: '2017-12-31', createUser: 'root', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle SAVE_SCENE: switch between two aleady group', ()=> {
    const initialState = fromJS({
      groups: [
        {name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2016-12-31' },
        {name: 'A', createDate: '2017-12-31', createUser: 'root', updateDate: '2018-12-31' },
      ],
      entries: [
        { id: 'Scene1', group: '未启用', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2016-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
        { id: 'Scene2', group: 'A', name: '未命名', desc: '', createDate: '2017-12-31', updateDate: '2018-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
      ],
    });
    const action = {
      type: CurSceneActionTypes.SAVE_SCENE,
      payload: {
        id: 'Scene1', group: 'A', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2019-12-31', createUser: 'root', theme: 'TealTheme', placers: [],
      },
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          {name: '未启用', createDate: '2015-12-31', createUser: 'root', updateDate: '2019-12-31' },
          {name: 'A', createDate: '2017-12-31', createUser: 'root', updateDate: '2019-12-31' },
        ],
        entries: [
          { id: 'Scene1', group: 'A', name: '未命名', desc: '', createDate: '2015-12-31', updateDate: '2019-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
          { id: 'Scene2', group: 'A', name: '未命名', desc: '', createDate: '2017-12-31', updateDate: '2018-12-31', createUser: 'root', theme: 'TealTheme', placers: [], },
        ],
      }
    ));
  });

  it('handle DELETE_GROUP: empty group', ()=> {
    const initialState = fromJS({
      groups: [
        { name: 'A', createDate: '', createUser: '' },
        { name: 'B', createDate: '', createUser: '' },
      ],
      entries: [
        { id: 'Scene2', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        { id: 'Scene3', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        { id: 'Scene4', group: 'C', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
      ],
    });
    const action = {
      type: ScenesActionTypes.DELETE_GROUP,
      payload: 'A',
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: 'B', createDate: '', createUser: '' },
        ],
        entries: [
          { id: 'Scene2', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
          { id: 'Scene3', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
          { id: 'Scene4', group: 'C', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle DELETE_GROUP: has scenes group', ()=> {
    const initialState = fromJS({
      groups: [
        { name: 'A', createDate: '', createUser: '' },
        { name: 'B', createDate: '', createUser: '' },
      ],
      entries: [
        { id: 'Scene2', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        { id: 'Scene3', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        { id: 'Scene4', group: 'C', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
      ],
    });
    const action = {
      type: ScenesActionTypes.DELETE_GROUP,
      payload: 'B',
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: 'A', createDate: '', createUser: '' },
        ],
        entries: [
          { id: 'Scene4', group: 'C', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });

  it('handle DELETE_SCENE:', ()=> {
    const initialState = fromJS({
      groups: [
        { name: 'A', createDate: '', createUser: '' },
        { name: 'B', createDate: '', createUser: '' },
      ],
      entries: [
        { id: 'Scene2', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        { id: 'Scene3', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        { id: 'Scene4', group: 'C', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
      ],
    });
    const action = {
      type: ScenesActionTypes.DELETE_SCENE,
      payload: 'Scene2',
    };
    const nextState = scenesReducer(initialState, action);

    expect(nextState).to.equal(fromJS(
      {
        groups: [
          { name: 'A', createDate: '', createUser: '' },
          { name: 'B', createDate: '', createUser: '' },
        ],
        entries: [
          { id: 'Scene3', group: 'B', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
          { id: 'Scene4', group: 'C', name: '未命名', desc: '', createDate: '', createUser: '', theme: 'TealTheme', placers: [] },
        ],
      }
    ));
  });
});
