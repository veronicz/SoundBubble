import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import {
  changeCurrentGroup,
  fetchGroupSongLogs
} from '../../actions/homeActions';

class GroupButton extends Component {
  getMyGroups() {
    const {
      currentGroup,
      myGroupsReady,
      changeCurrentGroup,
      fetchGroupSongLogs
    } = this.props;
    let myGroups = [];
    if (myGroupsReady) {
      let myGroupIds = Meteor.user().groupIds;
      if (myGroupIds) {
        myGroups = Groups.find({
          _id: { $in: myGroupIds }
        }).fetch();
        //set currentGroup to the first group if it is not initialized but the user has groups
        if (!currentGroup) {
          changeCurrentGroup(myGroups[0]._id);
        }
      }
      //display the initial group song logs (will fetch user song logs if user is not in any groups)
      fetchGroupSongLogs();
    }
    return myGroups;
  }

  render() {
    const { currentGroup, changeCurrentGroup } = this.props;
    let myGroups = this.getMyGroups();
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
              onClick={() => changeCurrentGroup(g._id)}
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
  withTracker(props => {
    return {
      myGroupsReady: Meteor.subscribe('myGroupIds').ready()
    };
  }),
  connect(
    mapStateToProps,
    { changeCurrentGroup, fetchGroupSongLogs }
  )
)(GroupButton);
