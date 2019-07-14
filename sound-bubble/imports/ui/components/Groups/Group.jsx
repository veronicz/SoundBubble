import React, { Component } from 'react';
import '../../stylesheets/Groups.css';
import GroupMember from './GroupMember.jsx';
import Search from './Search.jsx'
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

  closeSearchUserBar = () => {
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
      searchUserBar = (<Search existUsers={userIds} groupId={groupId} closeSearch={this.closeSearchUserBar}/>);
    }

    return (
      <div>
        <div className="group_header">
          <h1 className="groupName"> {groupName} </h1>
          <div className="group_options">
            <div
              className="option_container"
              onClick={() => this.openSearchUserBar()}
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
        {searchUserBar}
        {userDivs}
      </div>
    );
  }
}

export default connect(
  null,
  { deleteGroup }
)(Group);
