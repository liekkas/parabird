import React, { PropTypes } from 'react';
import { TextField, FlatButton } from 'material-ui';

class PBImageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
    };
  }

  getConfig() {
    const duration = this.refs.duration.getValue();
    return { duration };
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
        <TextField ref="duration"
          hintText="动画延迟时间"
          defaultValue={this.props.config.duration}
          floatingLabelText="动画延迟时间" />
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

PBImageEditor.propTypes = {
  config: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
PBImageEditor.defaultProps = {
  config: { duration: 500 },
};

export default PBImageEditor;
