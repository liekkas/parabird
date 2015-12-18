/**
 * Created by liekkas on 15/12/18.
 */
import React from 'react';

export default function hi(component) {
  return class extends React.Component {

    render() {
      return (
        <div style={{ backgroundColor: '#FFFF88' }}>
          <component {...this.state}/>
        </div>
      );
    }
  };
}
