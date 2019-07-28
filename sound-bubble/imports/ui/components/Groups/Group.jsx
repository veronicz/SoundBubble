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
      deleteGroupDialog: false,
      searchUserBar: false,
      adminPromote: false,
      removeStatus: false,
    };
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  // group members will be passed down as a prop from Groups

  openDeleteForm() {
    this.setState({
      deleteGroupDialog: true,
      searchUserBar: false,
      adminPromote: false,
      removeStatus: false,
    });
  }

  closeDeleteForm() {
    this.setState({ deleteGroupDialog: false });
  }

  openSearchUserBar() {
    this.setState({
      searchUserBar: true,
      deleteGroupDialog: false,
      adminPromote: false,
      removeStatus: false,
    });
  }

  closeSearchUserBar = () => {
    this.setState({ searchUserBar: false });
  }

  openPromotion() {
    this.setState({
      adminPromote:true,
      searchUserBar:false,
      deleteGroupDialog:false,
      removeStatus: false,
    })
  }

  closePromotion () {
    this.setState({adminPromote:false});
  }

  openRemoveForm() {
    this.setState({
      adminPromote:false,
      searchUserBar:false,
      deleteGroupDialog:false,
      removeStatus: true,
    })
  }

  closeRemoveForm () {
    this.setState({removeStatus:false});
  }

  deleteGroup(event) {
    event.preventDefault();
    this.props.deleteGroup(this.props.groupId);
    this.closeDeleteForm();
  }

  createGroupMembersComponents(userIds, groupId, adminId, promotion, remove) {
    return userIds.map(userId => (
      <GroupMember key={userId} userId={userId} groupId={groupId} adminId={adminId} promotion={promotion} remove={remove}/>
    ));
  }

  render() {
    const { groupId, groupName, userIds, adminId } = this.props;
    let deleteGroupPopUp = <div />;
    if (this.state.deleteGroupDialog === true) {
      deleteGroupPopUp = (
        <div className="form-popup" className="myForm">
          <form className="form-container" onSubmit={this.deleteGroup}>
            <label htmlFor="groupName">
              <b>
                <h3 className="warning">Warning!</h3> You are about to permanently delete this group. All
                members will be removed from this group and all group
                information will be lost. You cannot undo this action. Are you
                sure?
              </b>
            </label>

            <button type="submit" className="btn">
              Yes, Delete
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

    let promotePop = <div />;
    if(this.state.adminPromote === true){
      promotePop = (
        <div className="form-popup" className="myForm">
        <form className="form-container">
          <label htmlFor="groupName">
            <b>
              <h3 className="warning">Notice!</h3> You are the current administrator of this group. You can reassign this role to another member of the group, but this will revoke your administrator status. After promoting another user, you can still make changes as an administrator prior to hitting the "Done" button below.
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
      )
    }

    let removePop = <div />;
    if(this.state.removeStatus === true){
      removePop = (
        <div className="form-popup" className="myForm">
        <form className="form-container">
          <label htmlFor="groupName">
            <b>
              <h3 className="warning">Notice!</h3> Remove users by clicking the "X" beside a user's icon. This removes users from the current group, removing that user's votes and songs from group data. 
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
      )
    }

    let userDivs = this.createGroupMembersComponents(userIds, groupId, adminId, this.state.adminPromote, this.state.removeStatus);

    let searchUserBar = <div />;
    if (this.state.searchUserBar === true) {
      searchUserBar = (<Search existUsers={userIds} groupId={groupId} closeSearch={this.closeSearchUserBar} />);
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
            {(Meteor.user().profile.id === adminId) ? (
              <div className="option_container"
                onClick={() => this.openPromotion()}>
                <div className="glyphicon glyphicon-flag white">
                  <span className="tooltiptext">Change Group Admin</span>
                </div>
              </div>
            ) : null}
            {(Meteor.user().profile.id === adminId) ? (
              <div className="option_container"
                onClick={() => this.openRemoveForm()}>
                <div className="glyphicon glyphicon-remove white">
                  <span className="tooltiptext">Remove User</span>
                </div>
              </div>
            ) : null}
            {(Meteor.user().profile.id === adminId) ? (
            <div className="option_container"
              onClick={() => this.openDeleteForm()}>
              <div className="glyphicon glyphicon-trash white">
                <span className="tooltiptext">Delete Group</span>
              </div>
            </div>
            ) : null}
          </div>
          {deleteGroupPopUp}
          {promotePop}
          {removePop}
        </div>
        <div className="search-align">
        {searchUserBar}
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
