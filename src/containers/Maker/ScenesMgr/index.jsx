import React, { PropTypes } from 'react';
import { Popover, Avatar, Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, FlatButton } from 'material-ui';
import style from './style.scss';

class ScenesMgr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  render() {
    const { onScenesMgrClose } = this.props;
    return (
      <Popover open={true} className={style.root}
               onRequestClose={onScenesMgrClose} >
        <div style={{ padding:20 }}>
          <Card className={style.card}>
            <CardHeader
              title="元旦节场景"
              subtitle="最后更新 2016-01-10"
              avatar={<Avatar style={{color: 'red'}}>元</Avatar>}/>
            <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
              <img src="http://lorempixel.com/600/337/nature/"/>
            </CardMedia>
            <CardTitle title="Title" subtitle="Subtitle"/>
            <CardActions>
              <FlatButton label="Action1"/>
              <FlatButton label="Action2"/>
            </CardActions>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
        </div>
      </Popover>
    );
  }
}

ScenesMgr.propTypes = {
  open: PropTypes.bool.isRequired,
  onScenesMgrClose: PropTypes.func.isRequired,
};
ScenesMgr.defaultProps = {
  open: true,
};

export default ScenesMgr;
