===== ParaBird ====

//TODO 加文档


#### 代码设计
* store:
    最终的store结构应如下:
```
    {
      user: {id,name},    //用户信息
      theme: 'RedTheme',  //全局主题
      scenes: {
          groups: [{name: 'A', createDate: '', createUser: ''}], //分组名称
          entries: [
            {
              group: 'a',
              id: '场景id',
              name: '场景名称',
              desc: '场景描述',
              createDate: '创建日期',
              createUser: '创建人',
              theme: '主题',
              layouts: [
                {name,x,y,w,h,componentType,componentConfig: {
                  dataAPI: //组件数据来源
                  style: //组件外观
                }}, //单个组件的布局信息,placer名字,x,y,w,h数据,内部组件类型,组件配置
                {},
              ] //组件布局
            }, //scene信息:
            {...},
            {...},
           ]
           },  //所有场景  
      curScene: {
                id: '场景id',
                name: '场景名称',
                desc: '场景描述',
                createDate: '创建日期',
                createUser: '创建人',
                theme: '主题',
                layouts: [
                  {name,x,y,w,h,componentType,componentConfig}, //单个组件的布局信息,placer名字,x,y,w,h数据,内部组件类型,组件配置
                  {},
                ] //组件布局
              },//当前工作区的场景信息  -- 可以是新建,也可以是编辑      
    }
```
  

