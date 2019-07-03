import React, { Component } from 'react';
import '../../stylesheets/Groups.css';
import Group from './Group.jsx';

export default class Groups extends Component {
  render() {
    return (<div className="groups_container">
        <h1 className="group_heading"> Groups </h1>
        <Group/>
    </div>);

  }
}
