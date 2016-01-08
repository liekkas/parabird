import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { TextField, FlatButton } from 'material-ui';
import { Editor } from '../../hocs';

class LineChartEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
    };
  }

  getConfig() {
    const title = ''; //this.refs.title.getValue();
    return { title };
  }

  handlerSubmit() {
    this.props.on(this.getConfig());
  }

  render() {
    const { onSave, onCancel } = this.props;
    return (
      <div style={{
        width: '100%',
        height: '100%',
      }}>
        <TextField
          hintText="标题"
          defaultValue={this.props.config.title}
          floatingLabelText="标题" />
        <TextField
          hintText="标题"
          defaultValue={this.props.config.title}
          floatingLabelText="标题" />
        <TextField
          hintText="标题"
          defaultValue={this.props.config.title}
          floatingLabelText="标题" />
        <div style={{
          position: 'absolute',
          right: '8px',
          bottom: '8px',
        }}>
          <FlatButton
            label="取消"
            secondary={true}
            onTouchTap={() => onCancel()}
          />
          <FlatButton
            label="提交"
            primary={true}
            keyboardFocused={true}
            onTouchTap={() => onSave(this.getConfig())} />
        </div>
      </div>
    );
  }
}

LineChartEditor.propTypes = {
  config: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
LineChartEditor.defaultProps = {
  config: { title: 'wfk' },
};

export default LineChartEditor;
