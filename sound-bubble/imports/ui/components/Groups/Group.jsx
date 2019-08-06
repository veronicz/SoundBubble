import React, { Component } from 'react';
import '../../stylesheets/Groups.css';
import GroupMember from './GroupMember.jsx';
import Search from './Search.jsx';

// props:
// groupId
// groupName
// userIds
// adminId

export default class Group extends Component {
  constructor() {
    super();
    this.state = {
      searchUserBar: false,
      adminPromote: false,
      removeStatus: false
    };
  }

  openState(stateKey) {
    let newState = this.state;
    Object.keys(this.state).forEach(key => {
      newState[key] = key === stateKey;
    });
    this.setState(newState);
  }

  closeSearchUserBar = () => {
    this.setState({ searchUserBar: false });
  };

  closePromotion() {
    this.setState({ adminPromote: false });
  }

  closeRemoveForm() {
    this.setState({ removeStatus: false });
  }

  createGroupMembersComponents(userIds, groupId, adminId, promotion, remove) {
    let userCount = userIds.length;
    return userIds.map(userId => (
      <GroupMember
        key={userId}
        userId={userId}
        groupId={groupId}
        isAdmin={userId === adminId}
        userCount={userCount}
        promotion={promotion}
        remove={remove}
      />
    ));
  }

  render() {
    const { groupId, groupName, userIds, adminId } = this.props;

    let promotePop = <div />;
    if (this.state.adminPromote === true) {
      promotePop = (
        <div className="form-popup" className="myForm">
          <form className="form-container">
            <label htmlFor="groupName">
              <b>
                <h3 className="warning">Notice!</h3> You are the current
                administrator of this group. You can reassign this role to
                another member of the group, but this will revoke your
                administrator status. After promoting another user, you can
                still make changes as an administrator prior to hitting the
                "Done" button below.
              </b>
            </label>
            <button
              type="button"
              className="btn cancel"
              onClick={() => this.closePromotion()}
            >
              Done
            </button>
          </form>
        </div>
      );
    }

    let removePop = <div />;
    if (this.state.removeStatus === true) {
      removePop = (
        <div className="form-popup" className="myForm">
          <form className="form-container">
            <label htmlFor="groupName">
              <b>
                <h3 className="warning">Notice!</h3> Remove users by clicking
                the "&times;" beside a user's icon. This removes users from the
                current group, removing that user's votes and songs from group
                data.
              </b>
            </label>
            <button
              type="button"
              className="btn cancel"
              onClick={() => this.closeRemoveForm()}
            >
              Done
            </button>
          </form>
        </div>
      );
    }

    let userDivs = this.createGroupMembersComponents(
      userIds,
      groupId,
      adminId,
      this.state.adminPromote,
      this.state.removeStatus
    );

    let searchUserBar = <div />;
    if (this.state.searchUserBar === true) {
      searchUserBar = (
        <Search
          existUsers={userIds}
          groupId={groupId}
          closeSearch={this.closeSearchUserBar}
        />
      );
    }

    return (
      <div className="group_container">
        <div className="group_header">
          <h1 className="groupName"> {groupName} </h1>
          <div className="group_options">
            <div
              className="option_container"
              onClick={() => this.openState('searchUserBar')}
            >
              <div className="glyphicon glyphicon-user white">
                <span className="tooltiptext">Add User</span>
              </div>
            </div>
            {Meteor.user().profile.id === adminId ? (
              <div
                className="option_container"
                onClick={() => this.openState('adminPromote')}
              >
                <div className="glyphicon glyphicon-flag white">
                  <span className="tooltiptext">Change Group Admin</span>
                </div>
              </div>
            ) : null}
            {Meteor.user().profile.id === adminId ? (
              <div
                className="option_container"
                onClick={() => this.openState('removeStatus')}
              >
                <div className="glyphicon glyphicon-remove white">
                  <span className="tooltiptext">Remove User</span>
                </div>
              </div>
            ) : null}
          </div>
          {promotePop}
          {removePop}
        </div>
        <div className="search-align">{searchUserBar}</div>
        <div className="groupMembers">{userDivs}</div>
      </div>
    );
  }
}
