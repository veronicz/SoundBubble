import React, { Component } from 'react';
import '../../stylesheets/Groups.css';

export default class Group extends Component {
  render() {
    return (<div>
        <div className="group_header">
        <h1 className="groupName"> Group 1 </h1> 
        <div class="glyphicon glyphicon-remove-sign white"></div>
        <div class="glyphicon glyphicon-plus-sign white"></div>
        </div>


    </div>);
  }
}
