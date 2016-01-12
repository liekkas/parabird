import React, { PropTypes } from 'react';
import { Popover, Checkbox, FlatButton, RaisedButton } from 'material-ui';
import { screenCoverImages } from '../../../constants/Consts';
import { BASE_URL } from '../../../config';
import style from './style.scss';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import _ from 'lodash';

const cx = classNames.bind(style);

/**
 * 场景管理
 * //TODO Popover有个Bug,当不设置anchorEl时,会报getBoundingClientRect错
 */
class ScenesMgr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curGroup: props.groups[0].name,
      open: props.open,
      slickIndex: 0,
      showAlert: false,
      deleteType: 'group',
      needDeleteGroupName: '',
      needDeleteSceneId: '',
      alertText: '',
    };
  }

  _handleAlertShow(flag) {
    this.setState({ showAlert: flag });
  }

  _handleGroupDelete(groupName) {
    this.setState({
      showAlert: true,
      deleteType: 'group',
      needDeleteGroupName: groupName,
      alertText: '真的要删除场景组【' + groupName + '】吗? (注意组内的场景也将一并删除!!!)',
    });
  }

  _handleSceneDelete(sceneId, sceneName) {
    this.setState({
      showAlert: true,
      deleteType: 'scene',
      needDeleteSceneId: sceneId,
      alertText: '真的要删除场景【' + sceneName + '】吗? ',
    });
  }

  _handleConfirm() {
    this._handleAlertShow(false);
    const { deleteType, needDeleteGroupName, needDeleteSceneId } = this.state;
    if (deleteType === 'group') {
      //如果要删除的group是当前的group,那么向左移,因为第一个是不让删的,肯定有值
      if (needDeleteGroupName === this.state.curGroup) {
        const i = _.findIndex(this.props.groups, 'name', needDeleteGroupName);
        this.setState({ curGroup: this.props.groups[i - 1].name, slickIndex: 0 });
      }
      this.props.onGroupDelete(needDeleteGroupName);
    } else {
      this.props.onSceneDelete(needDeleteSceneId);
    }
  }

  _handleGroupClicked(name) {
    this.setState({ curGroup: name });
  }

  _getCover(cover) {
    const obj = _.find(screenCoverImages, 'name', cover);
    return obj ? obj.img : screenCoverImages[0].img;
  }

  render() {
    const { onScenesMgrClose, onSceneEdit, groups, user } = this.props;
    const editClassName = cx('edit', 'zmdi', 'zmdi-edit');
    const removeClassName = cx('remove', 'zmdi', 'zmdi-delete');
    const removeGroupClassName = cx('groupRemove', 'zmdi', 'zmdi-delete');
    const confirmBoxClassName = cx('confirmBox');
    const { slickIndex, alertText, showAlert, curGroup, curScenes } = this.state;

    console.log('>>> SceneMgr:', curGroup, curScenes, groups, this.props.entries);
    return (
      <Popover zDepth={2} open={true} className={style.root}
               onRequestClose={onScenesMgrClose} >
        <Slider className={style.slickBox} dots={false} draggable={true} slickGoTo={slickIndex} arrows={groups.length > 3}
                lazyLoad={false} infinite={false} speed={500} slidesToShow={3} slidesToScroll={3}>
          {
            groups.map(({ name, num }, index) =>
              <div className={style.wrapper} key={index}>
                <div className={style.groupCard} style={{
                  border: curGroup === name ? 'solid 2px white' : 'none',
                }}>
                  <FlatButton style={{ width: '90%' }} label={name} primary={true}
                              onTouchTap={() => this._handleGroupClicked(name)}/>
                  <label>{num}</label>
                  { name === '未分组' ? null : <div className={removeGroupClassName} onClick={() => this._handleGroupDelete(name)}/> }
                </div>
              </div>
            )
          }
        </Slider>

        <div className={confirmBoxClassName} style={{
          visibility: showAlert ? 'visible' : 'hidden',
        }}>
          <div>{alertText}</div>
          <FlatButton primary={true} labelStyle={{ color: '#ffff00' }} label="确认"
                      onClick={() => this._handleConfirm()} />
          <FlatButton primary={true} labelStyle={{ color: '#ffff00' }} label="取消"
                      onClick={() => this._handleAlertShow(false)} />
        </div>

        <Slider className={style.slickBox} dots={true} draggable={true} arrows={_.filter(this.props.entries, { 'group': curGroup }).length > 4} initialSlide={0}
                animating={false} lazyLoad={false} infinite={false} speed={500} slidesToShow={4} slidesToScroll={4}>
          {
            _.filter(this.props.entries, { 'group': curGroup }).map((scene, index) =>
              <div className={style.wrapper} key={index}>
                <div className={style.sceneCard}>
                  <h4>{scene.name}</h4>
                  <img src={this._getCover(scene.cover)}
                       onClick={() => window.open(BASE_URL + '#/show/' + user.name + '/' + scene.id)}/>
                  <h5>更新于{scene.updateDate.substr(0, 10)}</h5>
                  <div className={style.toolbox}>
                    <span className={editClassName}
                          onClick={() => onSceneEdit(scene)}>&nbsp;编辑</span>
                    <span className={removeClassName}
                          onClick={() => this._handleSceneDelete(scene.id, scene.name)} >&nbsp;删除</span>
                  </div>
                </div>
              </div>
            )
          }
        </Slider>

        <div className={style.sceneDimmer} style={{
          visibility: showAlert ? 'visible' : 'hidden',
        }}>

        </div>
      </Popover>
    );
  }
}

ScenesMgr.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired,
  onScenesMgrClose: PropTypes.func.isRequired,
  onSceneEdit: PropTypes.func,
  onSceneDelete: PropTypes.func,
  onGroupDelete: PropTypes.func,
};
ScenesMgr.defaultProps = {
  open: true,
};

export default ScenesMgr;
