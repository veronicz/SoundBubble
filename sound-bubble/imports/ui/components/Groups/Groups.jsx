import React, { Component } from 'react';
import '../../stylesheets/Groups.css';
import Group from './Group.jsx';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { createGroup } from '../../actions/groupActions';
import GroupsApi from '../../../api/groups';

class Groups extends Component {
  constructor() {
    super();
    this.state = { createGroupPopup: false };
    this.createGroup = this.createGroup.bind(this);
  }

  openForm() {
    this.setState({ createGroupPopup: true });
  }

  closeForm() {
    this.setState({ createGroupPopup: false });
  }

  createGroup(event) {
    event.preventDefault();
    let groupName = event.target.groupName.value.toString();
    this.props.createGroup(groupName);
    this.closeForm();
  }

  render() {
    const { myGroups } = this.props;
    let groupDivs = myGroups.map(g => (
      <Group
        key={g._id}
        groupId={g._id}
        groupName={g.name}
        adminId={g.adminId}
        userIds={g.userIds}
      />
    ));

    let popup = <div />;
    if (this.state.createGroupPopup === true) {
      popup = (
        <div className="form-popup" className="myForm">
          <form className="form-container" onSubmit={this.createGroup}>
            <label htmlFor="groupName">
              <b>Create New Group</b>
            </label>
            <input
              type="text"
              placeholder="Enter group name..."
              name="groupName"
              required
            />

            <button type="submit" className="btn">
              Create
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => this.closeForm()}
            >
              Close
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="groups_container">
        <div className="heading_container">
          <h1 className="group_heading"> Groups </h1>
          <div className="groups_options">
            <div className="option_container" onClick={() => this.openForm()}>
              <div className="glyphicon glyphicon-plus white">
                <span className="tooltiptext">Create New Group</span>
              </div>
            </div>
          </div>
        </div>
        {popup}
        {groupDivs}
      </div>
    );
  }
}

export default compose(
  withTracker(props => {
    const myGroupsReady = Meteor.subscribe('myGroups').ready();
    return {
      myGroups: myGroupsReady ? GroupsApi.find().fetch() : []
    };
  }),
  connect(
    null,
    { createGroup }
  )
)(Groups);
