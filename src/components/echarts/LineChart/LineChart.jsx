import React, { PropTypes } from 'react';
import BaseECharts from '../BaseECharts';

class LineChart extends React.Component {

  render() {
    return (
      <BaseECharts config={this.props.config} type="line" custom={{}} />
    );
  }
}

LineChart.propTypes = {
  config: PropTypes.object.isRequired,
};

export default LineChart;
