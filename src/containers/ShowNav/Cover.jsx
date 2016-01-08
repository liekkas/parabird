import React from 'react';
import Coverflow from 'react-coverflow';
import style from './style.scss';
import _ from 'lodash';
import { screenCoverImages } from '../../constants/Consts';

class Cover extends React.Component {

  getCover(cover) {
    const index = _.findIndex(screenCoverImages, 'name', cover);
    return screenCoverImages[index > -1 ? index : 0].img;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.showScenes.length > 0;
  }

  render() {
    console.log('>>> Cover:Render', this.props.showScenes);
    const { showScenes } = this.props;
    return (
      <Coverflow displayQuantityOfSide={2}
                 navigation={false}
                 enableScroll={true}
                 media={{
                  '@media (max-width: 100vw)': {
                    width: '90vw',
                    height: '100vh',
                    background: 'none',
                  },
                  '@media (min-width: 900px)': {
                    width: '90vw',
                    height: '100vh',
                    background: 'none',
                  }
                }}>
        {
          showScenes.map(({ id, name, cover }, index) =>
            <img className={style.img} key={index} src={this.getCover(cover)}
                 alt={name} url={'http://localhost:3000/#/show/2'} />
          )
        }
      </Coverflow>
    );
  }
}

Cover.propTypes = {
  showScenes: React.PropTypes.array.isRequired,
};
Cover.defaultProps = {
  showScenes: []
};

export default Cover;
