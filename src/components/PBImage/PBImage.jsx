import React, { PropTypes } from 'react';
import ImageGallery from 'react-image-gallery';
import Slider from 'react-slick';
import style from './style.scss';
import { screenCoverImages } from '../../constants/Consts';

class PBImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('>>> PBImage:shouldComponentUpdate', nextProps, nextState);
    return this.props.config !== nextProps.config;
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('>> PBImage update', this.props.id);
    //option.title.text = this.props.config.title;
    //mychart.setOption(option);
  }

  render() {
    //console.log('>>> PBImage:render:', this.props.id);

    const { config } = this.props;
    return (
      <Slider className={style.slickBox} dots={false} arrows={false} autoplay={true} initialSlide={0} draggable={false}
              lazyLoad={true} infinite={true} speed={config.duration} slidesToShow={1} slidesToScroll={1}>
        {
          screenCoverImages.map(({ img }, index) =>
            <div key={index}><img src={img}/></div>
          )
        }
      </Slider>
    );
  }
}

PBImage.propTypes = {
  id: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};
PBImage.defaultProps = {
  config: { duration: 500 },
};

export default PBImage;
