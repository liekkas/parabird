/**
 * 场景保存窗口
 */

import React, { PropTypes } from 'react';
import { MenuItem, DropDownMenu, TextField, AutoComplete, FlatButton, SelectField, Checkbox, RadioButton, RadioButtonGroup, Toggle } from 'material-ui';
import Slider from 'react-slick';
import style from './savewin.scss';
import { themes, screenRatios, screenNums, screenCoverImages } from '../../constants/Consts';
import _ from 'lodash';
import dateFormat from 'dateFormat';

class SaveWindow extends React.Component {
  constructor(props) {
    super(props);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.state = {
      name: this.props.name,
      desc: this.props.desc,
      group: this.props.group,
      theme: this.props.theme,
      cover: this.props.cover,
      errorText: this.props.name ? '' : '* 必填',
    };
  }

  getConfig() {
    const { group, theme, cover } = this.state;
    const name = this.refs.name.getValue();
    const desc = this.refs.desc.getValue();
    return { name, desc,
      group: group.length === 0 ? '未分组' : group,
      cover: cover.length === 0 ? screenCoverImages[0].name : cover,
      state: 'saved', updateDate: dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss') };
  }

  getCoverIndex() {
    const index = _.findIndex(screenCoverImages, 'name', this.state.cover);
    return index > -1 ? index : 0;
  }

  handlerSubmit() {
    if (this.valide()) {
      this.props.onSave(this.getConfig());
    }
  }

  valide() {
    const name = this.refs.name.getValue();
    if (name.length === 0) {
      this.refs.name.focus();
      return false;
    }

    //if (this.state.group.length === 0) {
    //  this.refs.group.focus();
    //  return false;
    //}

    return true;
  }

  _handleErrorInputChange(e) {
    this.setState({
      errorText: e.target.value ? '' : '* 必填',
    });
  }

  render() {
    const { name, desc, group, groups, theme, cover } = this.state;
    const { onSave, onCancel } = this.props;
    return (
      <div>
        <div className={style.save}>
          <div className={style.saveLeft}>
            <TextField ref="name"
              errorText={this.state.errorText}
              hintText="请输入场景名称"
              defaultValue={name}
              onChange={(e) => this._handleErrorInputChange(e)}
              floatingLabelText="场景名称" />
            <TextField ref="desc"
              multiLine={true}
              hintText="请输入场景描述"
              defaultValue={desc}
              floatingLabelText="场景描述"/>
            <AutoComplete ref="group"
              fullWidth={false}
              floatingLabelText="场景组"
              hintText="可从已有场景组中选,也可自定义"
              searchText={group}
              showAllItems={true}
              animated={true}
              dataSource={this.props.groups}
              onNewRequest={(g) => this.setState({ group: g })} />

          </div>
          <div className={style.saveRight}>
            <label style={{color: '#ffffff'}}>场景封面</label>
            <Slider className={style.slickBox} dots={true} arrows={true} initialSlide={this.getCoverIndex()} adaptiveHeight={true}
                    lazyLoad={false} infinite={false} speed={500} slidesToShow={1} slidesToScroll={1}
                    afterChange={ (index) => this.setState({ cover: screenCoverImages[index].name }) } >
              {
                screenCoverImages.map(({ img }, index) =>
                  <div className={style.div} key={index}><img src={img} /></div>
                )
              }
            </Slider>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          right: '8px',
          bottom: '8px',
        }}>
          <FlatButton
            label="取消"
            secondary={true}
            onTouchTap={() => onCancel()}
          />
          <FlatButton
            label="提交"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handlerSubmit} />
        </div>
      </div>
    );
  }
}

SaveWindow.propTypes = {
  name: PropTypes.string, //场景名称
  desc: PropTypes.string, //场景描述
  group: PropTypes.string, //当前场景组
  groups: PropTypes.array.isRequired, //所有的场景组
  theme: PropTypes.string, //主题
  cover: PropTypes.string, //场景封面
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
SaveWindow.defaultProps = {
  theme: 'TealTheme',
  group: '未分组',
  groups: [],
  cover: screenCoverImages[0].name,
};

export default SaveWindow;
//
//<div className={style.div}><img src="https://randomuser.me/api/portraits/women/62.jpg" /></div>
//<div className={style.div}><img src="https://randomuser.me/api/portraits/women/63.jpg" /></div>
//  <div className={style.div}><img src="https://randomuser.me/api/portraits/women/64.jpg" /></div>

/*
<SelectField
  value={theme}
  onChange={(event, index, value) => this.setState({ theme: value })}
  floatingLabelText="场景主题">
  {themes}
</SelectField>*/
