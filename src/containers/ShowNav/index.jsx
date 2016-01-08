import React from 'react';
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow';
import { Loader } from 'react-loaders';
import _ from 'lodash';
import { screenCoverImages } from '../../constants/Consts';
import { LOADING_STYLE } from '../../config';
import style from './style.scss';
import Cover from './Cover';

class ShowNav extends React.Component {

  handleClick() {
    console.log('>>> ShowNav:clicked');
  }

  render() {
    const { user, scenes } = this.props;
    return (
      <div className={style.root}>
        {
          scenes.entries.length > 0 ?
            <Cover user={user} showScenes={scenes.entries} /> : <Loader type={LOADING_STYLE} active={true} />
        }
      </div>
    );
  }
}

ShowNav.propTypes = {
  scenes: React.PropTypes.object.isRequired,
};
ShowNav.defaultProps = {
  scenes: {
    groups: [],
    entries: [],
  },
};

function select(state) {
  //console.log('>>> Maker:Selector', state.get('global'), state.get('curScene'));
  return {
    themeP: state.getIn(['global', 'theme']),
    screenRatio: state.getIn(['global', 'screenRatio']),
    screenNums: state.getIn(['global', 'screenNums']),
    user: state.getIn(['global', 'user']).toJS(),
    scenes: convert(state.get('scenes').toJS()),
    //scenes: {
    //  entries: [
    //    { id:'111', name:'haha', cover:'春节' },
    //    { id:'111', name:'haha', cover:'天际线' },
    //    { id:'111', name:'haha', cover:'天际线' },
    //    { id:'111', name:'haha', cover:'天际线' },
    //  ]
    //},
  };
}

function convert(obj) {
  const result = [];
  _.forEach(obj.entries, function (item) {
    result.push({ id: item.id, name: item.name, cover: item.cover });
  });
  return {
    entries: result,
  };
}

export default connect(select)(ShowNav);
