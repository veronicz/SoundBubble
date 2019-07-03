import React, { Component } from 'react';
import '../../stylesheets/Groups.css';
import GroupMember from './GroupMember.jsx';


export default class Group extends Component {

  constructor(){
    super();
    this.state = {groupID:"",
    members:[]};
  }

  // group members will be passed down as a prop from Groups

  deleteGroup(){
// TODO: delete group from db. Should only an "admin" user be able to do this? Maybe stretch requirement?
  }

  addNewGroupMember(){
// TODO: Add member to group in db
  }

  createGroupMembersComponents(){
    //TODO iterate through group members and for each member, create group member component using <GroupMember userImage="" userName="" isCurrentUser="true/false"/> and return the div. May need a db call here to get user details if we're just passing down the ID from Groups. 
  }

  render() {
    return (<div>
        <div className="group_header">
        <h1 className="groupName"> SoundBubble Devs </h1> 
        <div className="group_options">
        <div className="option_container" onClick={() => this.deleteGroup()}><div className="glyphicon glyphicon-user white"><span className="tooltiptext">Add User</span></div></div><div className="option_container" onClick={() => this.deleteGroup()}><div className="glyphicon glyphicon-trash white"><span className="tooltiptext">Delete Group</span></div></div>
        </div>
        </div>

        <GroupMember userImage="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10201448929539226&height=200&width=200&ext=1562344836&hash=AeRoRM9lN97xJOp5" userName="martipals" isCurrentUser="true"></GroupMember>
        <GroupMember userImage="https://avatars3.githubusercontent.com/u/33446354?s=460&v=4" userName="veronicz" isCurrentUser="false"></GroupMember>
        <GroupMember userImage="https://avatars3.githubusercontent.com/u/36035964?s=460&v=4" userName="talos6" isCurrentUser="false"></GroupMember>


        <div className="group_header">
        <h1 className="groupName"> Group 2 </h1> 
        <div className="group_options">
        <div className="option_container" onClick={() => this.deleteGroup()}><div className="glyphicon glyphicon-user white"><span className="tooltiptext">Add User</span></div></div><div className="option_container" onClick={() => this.deleteGroup()}><div className="glyphicon glyphicon-trash white"><span className="tooltiptext">Delete Group</span></div></div>
        </div>
        </div>

        <GroupMember userImage="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10201448929539226&height=200&width=200&ext=1562344836&hash=AeRoRM9lN97xJOp5" userName="martipals" isCurrentUser="true"></GroupMember>
        <GroupMember userImage="https://i.ytimg.com/vi/AyFbegeRcCQ/maxresdefault.jpg" userName="WollSmoth" isCurrentUser="false"></GroupMember>
        <GroupMember userImage="https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg" userName="adog" isCurrentUser="false"></GroupMember>

    </div>);
  }
}
