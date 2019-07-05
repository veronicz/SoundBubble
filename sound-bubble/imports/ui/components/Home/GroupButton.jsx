import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { changeCurrentGroup } from '../../actions/homeActions';

class GroupButton extends Component {
  render() {
    const { myGroupsReady, changeCurrentGroup } = this.props;
    let myGroups = [];
    if (myGroupsReady) {
      let myGroupIds = Meteor.user().groupIds;
      if (myGroupIds) {
        myGroups = Groups.find({
          _id: { $in: myGroupIds }
        }).fetch();
      }
    }

    return (
      <div className="dropdown">
        <button
          className="group_button btn btn-secondary btn-sm dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Choose Group
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

export default compose(
  withTracker(props => {
    return {
      myGroupsReady: Meteor.subscribe('myGroupIds').ready()
    };
  }),
  connect(
    null,
    { changeCurrentGroup }
  )
)(GroupButton);
