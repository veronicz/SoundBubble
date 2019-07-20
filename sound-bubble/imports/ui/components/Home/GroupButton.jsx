import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { changeCurrentGroup } from '../../actions/homeActions';

class GroupButton extends Component {
  setDefaultGroup() {
    const { currentGroupId, myGroups, changeCurrentGroup } = this.props;
    //set currentGroup to the first group if it is not initialized but the user has groups
    if (!currentGroupId && myGroups[0]) {
      changeCurrentGroup(myGroups[0]._id);
    }
  }

  handleChangeGroup(newGroupId) {
    const { currentGroupId, changeCurrentGroup } = this.props;
    if (newGroupId != currentGroupId) {
      changeCurrentGroup(newGroupId);
    }
  }

  renderCurrentGroupName() {
    const { currentGroupId, myGroups } = this.props;
    if (currentGroupId && myGroups.length !== 0) {
      return myGroups.find(g => g._id === currentGroupId).name;
    } else {
      return 'Join a group';
    }
  }

  render() {
    const { myGroups } = this.props;
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
          {this.renderCurrentGroupName()}
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
  console.log('currentGroupId', state.currentGroupId);
  return {
    currentGroupId: state.currentGroupId
  };
};

export default compose(
  connect(
    mapStateToProps,
    { changeCurrentGroup }
  ),
  withTracker(props => {
    const myGroupsReady = Meteor.subscribe('myGroups').ready();
    return {
      myGroups: myGroupsReady ? Groups.find().fetch() : []
    };
  })
)(GroupButton);
