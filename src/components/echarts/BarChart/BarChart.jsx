import React, { PropTypes } from 'react';
import BaseECharts from '../BaseECharts';

class BarChart extends React.Component {

  render() {
    return (
      <BaseECharts config={this.props.config} type="bar" custom={{}} />
    );
  }
}

BarChart.propTypes = {
  config: PropTypes.object.isRequired,
};

export default BarChart;
