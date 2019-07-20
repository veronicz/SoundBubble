import React, { Component } from 'react';
import SongLog from './SongLog.jsx';

export default class Home extends Component {
  render() {
    return (<div className="pageContainer">
      <SongLog/>
    </div>);
  }
}
