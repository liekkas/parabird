import React, { PropTypes } from 'react';
import BaseECharts from '../BaseECharts';

class GaugeChart extends React.Component {

  render() {
    return (
      <BaseECharts config={this.props.config} type="gauge" custom={{}} />
    );
  }
}

GaugeChart.propTypes = {
  config: PropTypes.object.isRequired,
};

export default GaugeChart;
