import React, { PropTypes } from 'react';
import ImageGallery from 'react-image-gallery';
import Slider from 'react-slick';
import style from './style.scss';

import { createUniqueId } from '../../tools/ztools';

var images = [
  {
    original: 'https://randomuser.me/api/portraits/women/63.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/63.jpg',
    originalClass: 'featured-slide',
    thumbnailClass: 'featured-thumb',
    description: 'Optional description...'
  },
  {
    original: 'https://randomuser.me/api/portraits/men/90.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/90.jpg'
  },
  {
    original: 'https://randomuser.me/api/portraits/women/55.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/55.jpg'
  }
];

class PBImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>> PBImage:shouldComponentUpdate', nextProps, nextState);
    return this.props.config !== nextProps.config;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>> PBImage update', this.props.id);
    //option.title.text = this.props.config.title;
    //mychart.setOption(option);
  }

  render() {
    console.log('>>> PBImage:render:', this.props.id);

    const { config } = this.props;
    return (
      <Slider dots={false} arrows={false} autoplay={true} initialSlide={0} draggable={false}
              lazyLoad={true} infinite={true} rtl={true} useCSS={true} speed={500} slidesToShow={1} slidesToScroll={1}>
        <div className={style.div}><img src="https://randomuser.me/api/portraits/women/61.jpg" /></div>
        <div className={style.div}><img src="https://randomuser.me/api/portraits/women/62.jpg" /></div>
        <div className={style.div}><img src="https://randomuser.me/api/portraits/women/63.jpg" /></div>
        <div className={style.div}><img src="https://randomuser.me/api/portraits/women/64.jpg" /></div>
      </Slider>
    );
  }
}

PBImage.propTypes = {
  id: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};
PBImage.defaultProps = {
  config: { showBullets: false },
};

export default PBImage;
