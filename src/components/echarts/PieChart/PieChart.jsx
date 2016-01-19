import React, { PropTypes } from 'react';
import BaseECharts from '../BaseECharts';

class PieChart extends React.Component {

  render() {
    return (
      <BaseECharts config={this.props.config} type="pie" custom={{}} />
    );
  }
}

PieChart.propTypes = {
  config: PropTypes.object.isRequired,
};

export default PieChart;
