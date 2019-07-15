import React, { Component } from 'react';
import '../../stylesheets/Groups.css';
import GroupMember from './GroupMember.jsx';
import { connect } from 'react-redux';
import { deleteGroup } from '../../actions/groupActions';

class Group extends Component {
  constructor() {
    // props:
    // groupId
    // groupName
    // userIds
    super();
    this.state = {
      groupID: '',
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

  openSearchUserBar() {
    this.setState({ searchUserBar: true });
  }

  closeSearchUserBar() {
    this.setState({ searchUserBar: false });
  }

  deleteGroup(event) {
    // TODO: delete group from db. Should only an "admin" user be able to do this? Maybe stretch requirement?
    event.preventDefault();
    this.props.deleteGroup(this.props.groupId);
    this.closeDeleteForm();
  }

  addNewGroupMember() {
    // TODO: Add member to group in db
  }

  createGroupMembersComponents(userIds, groupId) {
    return userIds.map(userId => (
      <GroupMember key={userId} userId={userId} groupId={groupId} />
    ));
  }

  render() {
    const { groupId, groupName, userIds } = this.props;
    let deleteGroupPopUp = <div />;
    if (this.state.deleteGroupDialog === true) {
      deleteGroupPopUp = (
        <div className="form-popup" className="myForm">
          <form className="form-container" onSubmit={this.deleteGroup}>
            <label htmlFor="groupName">
              <b>
                Warning: You are about to permanently delete this group. All
                members will be removed from this group and all group
                information will be lost. You cannot undo this action. Are you
                sure?
              </b>
            </label>

            <button type="submit" className="btn">
              Yes, Delete This Group.
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => this.closeDeleteForm()}
            >
              Cancel
            </button>
          </form>
        </div>
      );
    }

    let userDivs = this.createGroupMembersComponents(userIds, groupId);

    let searchUserBar = <div />;
    if (this.state.searchUserBar === true) {
      searchUserBar = (
        <div className="myDropdown" className="dropdown-content">
          <input type="text" placeholder="Search.." id="myInput" />
          <a href="#about">About</a>
          <a href="#base">Base</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
          <a href="#custom">Custom</a>
          <a href="#support">Support</a>
          <a href="#tools">Tools</a>

          <button
            className="closeUserSearch"
            onClick={() => this.closeSearchUserBar}
          >
            Close
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="group_header">
          <h1 className="groupName"> {groupName} </h1>
          <div className="group_options">
            <div
              className="option_container"
              onClick={() => this.addNewGroupMember()}
            >
              <div className="glyphicon glyphicon-user white">
                <span className="tooltiptext">Add User</span>
              </div>
            </div>
            <div
              className="option_container"
              onClick={() => this.openDeleteForm()}
            >
              <div className="glyphicon glyphicon-trash white">
                <span className="tooltiptext">Delete Group</span>
              </div>
            </div>
          </div>
          {deleteGroupPopUp}
        </div>

      <div className="groupMembers">
      {userDivs}
      </div>
    </div>);
  }
}

export default connect(
  null,
  { deleteGroup }
)(Group);
