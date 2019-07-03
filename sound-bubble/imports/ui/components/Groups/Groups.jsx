import React, { Component } from 'react';
import '../../stylesheets/Groups.css';
import Group from './Group.jsx';

export default class Groups extends Component {

  createGroup(){
    // TODO: Create new group in db
  }

  getGroupsForCurrentUser(){
    //TODO: get groups for current user
  }

  createGroupComponents(){
    //TODO: create a div containing all Groups that the user belongs to. Iterate through their groups and create a <Group> component for each one with props groupName, groupID, userIds. 
  }

  render() {
    return (<div className="groups_container">
      <div className="heading_container">
        <h1 className="group_heading"> Groups </h1><div className="group_options"><div className="option_container" onClick={() => this.createGroup()}><div className="glyphicon glyphicon-plus white"><span className="tooltiptext">Create New Group</span></div></div></div>
      </div>
      
      <Group groupName="" groupId="" usersIds=""/>


    </div>);

  }
}
