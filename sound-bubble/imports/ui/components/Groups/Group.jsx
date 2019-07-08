import React, { Component } from 'react';
import '../../stylesheets/Groups.css';
import GroupMember from './GroupMember.jsx';
import Groups from '../../../api/groups';


export default class Group extends Component {

  constructor() {
    // props:
    // groupId
    // groupName
    // userIds
    super();
    this.state = {
      groupID: "",
      members: [],
      deleteGroupDialog: false,
      searchUserBar: false
    };
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  // group members will be passed down as a prop from Groups

  openDeleteForm() {
    this.setState({ deleteGroupDialog: true });
  }

  closeDeleteForm() {
    this.setState({ deleteGroupDialog: false });
  }

  openSearchUserBar(){
    this.setState({searchUserBar: true});
    console.log("opened");
  }

  closeSearchUserBar(){
    this.setState({searchUserBar: false});
  }

  deleteGroup() {
    // TODO: delete group from db. Should only an "admin" user be able to do this? Maybe stretch requirement?
    Groups.deleteOne({
      "_id":this.props.groupId
    });
    console.log("group deleted");
    this.closeDeleteForm();
  }

  addNewGroupMember() {
    // TODO: Add member to group in db
  }

  createGroupMembersComponents() {
    //TODO iterate through group members and for each member, create group member component using <GroupMember userImage="" userName="" isCurrentUser="true/false"/> and return the div. May need a db call here to get user details if we're just passing down the ID from Groups. 
  }

  render() {
    let deleteGroupPopUp = <div></div>;
    if (this.state.deleteGroupDialog === true) {
      deleteGroupPopUp = (<div className="form-popup" className="myForm">
        <form className="form-container" onSubmit={this.deleteGroup}>
          <label htmlFor="groupName"><b>Warning: You are about to permanently delete this group. All members will be removed from this group and all group information will be lost. You cannot undo this action. Are you sure?</b></label>

          <button type="submit" className="btn">Yes, Delete This Group.</button>
          <button type="button" className="btn cancel" onClick={() => this.closeDeleteForm()}>Cancel</button>
        </form>
      </div>);

    }

    let userDivs=createUserDivs(this.props.userIds);

    let searchUserBar = <div></div>;
    if (this.state.searchUserBar === true){
      searchUserBar = (<div className="myDropdown" className="dropdown-content">
      <input type="text" placeholder="Search.." id="myInput" />
      <a href="#about">About</a>
      <a href="#base">Base</a>
      <a href="#blog">Blog</a>
      <a href="#contact">Contact</a>
      <a href="#custom">Custom</a>
      <a href="#support">Support</a>
      <a href="#tools">Tools</a>

      <button className="closeUserSearch" onClick={() => this.closeSearchUserBar}>Close</button>
    </div>);
    }

    return (<div>
      <div className="group_header">
        <h1 className="groupName"> {this.props.groupName} </h1>
        <div className="group_options">
          <div className="option_container" onClick={() => this.addNewGroupMember()}><div className="glyphicon glyphicon-user white"><span className="tooltiptext">Add User</span></div></div><div className="option_container" onClick={() => this.openDeleteForm()}><div className="glyphicon glyphicon-trash white"><span className="tooltiptext">Delete Group</span></div></div>
        </div>
        {deleteGroupPopUp}
      </div>

      {userDivs}
    </div>);
  }
}

function createUserDivs(userIds){
  console.log(userIds);
  return userIds.map(userId => {
    let user = Meteor.users.findOne({ 'profile.id': userId});
    console.log(userId);

    let currentUser= Meteor.user();
    let isCurrentUser=false;

    if (currentUser.profile.id === userId){
      isCurrentUser=true;
    }

    console.log(isCurrentUser);

    return (<GroupMember key={userId} userImage={user.profile.images[0].url} userName={user.profile.display_name} isCurrentUser={isCurrentUser}/> );

  })

}



