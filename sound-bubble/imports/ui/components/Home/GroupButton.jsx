import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import {
  changeCurrentGroup,
  fetchGroupSongLogs
} from '../../actions/homeActions';
import '../../stylesheets/main.css';

class GroupButton extends Component {
  setDefaultGroup() {
    const {
      currentGroup,
      myGroups,
      changeCurrentGroup,
      fetchGroupSongLogs
    } = this.props;
    //set currentGroup to the first group if it is not initialized but the user has groups
    if (!currentGroup && myGroups[0]) {
      changeCurrentGroup(myGroups[0]._id);
    }
    //display the initial group song logs (will fetch user song logs if user is not in any groups)
    fetchGroupSongLogs();
  }

  handleChangeGroup(newGroupId) {
    const { currentGroup, changeCurrentGroup } = this.props;
    if (newGroupId != currentGroup._id) {
      changeCurrentGroup(newGroupId);
    }
  }

  render() {
    const { currentGroup, myGroups } = this.props;
    this.setDefaultGroup();
    return (
      <div className="dropdown">
        <button
          className="feed_button btn btn-secondary btn-lg dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {currentGroup ? currentGroup.name : 'Join a group'}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {myGroups.map(g => (
            <a
              key={g._id}
              className="dropdown-item"
              href="#"
              onClick={() => this.handleChangeGroup(g._id)}
            >
              {g.name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('currentGroup', state.currentGroup);
  return {
    currentGroup: state.currentGroup
  };
};

export default compose(
  connect(
    mapStateToProps,
    { changeCurrentGroup, fetchGroupSongLogs }
  ),
  withTracker(props => {
    const myGroupsReady = Meteor.subscribe('myGroups').ready();
    return {
      myGroups: myGroupsReady ? Groups.find().fetch() : []
    };
  })
)(GroupButton);
