import React, { PropTypes } from 'react';
import { TextField, FlatButton } from 'material-ui';
import style from './style.scss';

class PBTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getConfig() {
    const title = this.refs.title.getValue();
    const text = this.refs.text.getValue();
    return { title, text };
  }

  handlerSubmit() {
    this.props.on(this.getConfig());
  }

  render() {
    const { config, onSave, onCancel } = this.props;
    return (
      <div>
        <div className={style.editor}>
              <TextField ref="title"
                         fullWidth={true}
                         hintText="请输入标题"
                         defaultValue={config.title}
                         floatingLabelText="标题" />
            <TextField ref="text"
                       multiLine={true}
                       fullWidth={true}
                       rows={4}
                       rowsMax={8}
                       hintText="请输入正文"
                       defaultValue={config.text}
                       floatingLabelText="正文(按Enter键换行)"/>
        </div>
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

PBTextEditor.propTypes = {
  config: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

PBTextEditor.defaultProps = {
};

export default PBTextEditor;
