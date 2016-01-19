import React, { PropTypes } from 'react';
import BaseECharts from '../BaseECharts';

class MapChart extends React.Component {

  render() {
    return (
      <BaseECharts config={this.props.config} type="map" custom={{}} />
    );
  }
}

MapChart.propTypes = {
  config: PropTypes.object.isRequired,
};

export default MapChart;
