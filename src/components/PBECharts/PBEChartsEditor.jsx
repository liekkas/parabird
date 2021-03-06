import React, { PropTypes } from 'react';
import { TextField, FlatButton, RadioButtonGroup, RadioButton } from 'material-ui';
import style from './style.scss';

class PBEChartsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.config.mode,
      foo: 'bar',
    };
  }

  getConfig() {
    const localData = this.refs.localData.getValue();
    const remoteDataUrl = this.refs.remoteDataUrl.getValue();
    return { type: this.props.config.type, localData, remoteDataUrl, mode: this.state.mode, };
  }

  render() {
    const { config, onSave, onCancel } = this.props;
    return (
      <div className={style.root}>
        <div className={style.rgb}>
          <RadioButtonGroup name="mode" defaultSelected={config.mode} className={style.rbg}
                            onChange={(event, selected) => this.setState({ mode: selected })}>
            <RadioButton
              value="local"
              label="本地模式" />
            <RadioButton
              value="remote"
              label="远程模式" />
          </RadioButtonGroup>
        </div>
        <div className={style.right}>
          <TextField ref="remoteDataUrl"
                     style={{ display: this.state.mode === 'local' ? 'none' : '', }}
                     hintText="远程服务URL"
                     fullWidth={true}
                     multiLine={false}
                     defaultValue={config.remoteDataUrl}
                     floatingLabelText="远程服务URL" />
          <TextField ref="localData"
                     style={{ display: this.state.mode === 'remote' ? 'none' : '', }}
                     multiLine={true}
                     fullWidth={true}
                     rows={4}
                     rowsMax={8}
                     hintText="请输入正文"
                     defaultValue={config.localData}
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

PBEChartsEditor.propTypes = {
  config: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PBEChartsEditor;
