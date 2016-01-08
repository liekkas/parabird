import React, { PropTypes } from 'react';
import { TextField, FlatButton } from 'material-ui';

import { PopupContainer } from '../../hocs/hi.jsx';

class PBImageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
    };
  }

  getConfig() {
    return { showBullets: true };
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
        {this.state.data}
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
  config: { title: 'wfk' },
};

export default PopupContainer(PBImageEditor);
