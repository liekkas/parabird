import React, { PropTypes } from 'react';
import BaseEChartsEditor from '../BaseEChartsEditor';

class BarChartEditor extends React.Component {
  render() {
    const { config, onCancel, onSave } = this.props;
    return (
      <BaseEChartsEditor config={config} onSave={(item) => onSave(item)} onCancel={() => onCancel()}/>
    );
  }
}

BarChartEditor.propTypes = {
  config: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default BarChartEditor;
