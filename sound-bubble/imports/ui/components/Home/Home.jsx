import React, { Component } from 'react';
import SongLog from './SongLog.jsx';
import '../../stylesheets/main.css';

export default class Home extends Component {
  render() {
    return (<div className="pageContainer">
      <SongLog/>
    </div>);
  }
}
