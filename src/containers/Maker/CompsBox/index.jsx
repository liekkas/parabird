/**
 * 组件库
 */
import React from 'react';
import { RaisedButton } from 'material-ui';
import CompSnap from './CompSnap';
import _ from 'lodash';
import { Lookup } from '../../../constants/LookUp';

//stateless 写法
const CompsBox = (props) =>
  <div>
    {
      _.keys(Lookup).map((type, index) =>
        <CompSnap key={index} name={Lookup[type].name} type={type} image={Lookup[type].img}/>
      )
    }
  </div>;

export default CompsBox;

//
//class CompsBox extends React.Component {
//
//  shouldComponentUpdate(nextProps, nextState) {
//    return false;
//  }
//
//  render() {
//    console.log('>>> CompsBox:', Lookup);
//    return (
//      <div>
//        {
//          _.keys(Lookup).map((type, index) =>
//            <CompSnap key={index} name={Lookup[type].name} type={type} image={Lookup[type].img}/>
//          )
//        }
//      </div>
//    );
//  }
//}
//
//CompsBox.propTypes = {
//
//};
//
//CompsBox.defaultProps = {
//
//};
//
//export default CompsBox;
