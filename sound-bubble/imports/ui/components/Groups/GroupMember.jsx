import React from 'react';
import '../../stylesheets/Groups.css';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';
import { leaveGroup } from '../../actions/groupActions';
import { Meteor } from 'meteor/meteor';

class GroupMember extends React.Component {
  constructor() {
    super();
    this.leaveGroup = this.leaveGroup.bind(this);
  }

  leaveGroup(event) {
    event.preventDefault();
    this.props.leaveGroup(this.props.groupId);
  }

  isCurrentUser() {
    return Meteor.user().profile.id === this.props.userId;
  }

  render() {
    const { user } = this.props;
    if (user) {
      let userImage =
        (user.images[0] && user.images[0].url) ||
        'https://cdn4.iconfinder.com/data/icons/staff-management-vol-1/72/38-512.png';

      return (
        <li className="groupMember_container">
          <span className="groupMember_card">
            <div className="profile_photo">
              <img
                className="user_photo"
                src={userImage}
                onClick={() => {
                  window.open(
                    userImage.toString(),
                    'popup',
                    'width=650,height=450'
                  );
                  return false;
                }}
              />
            </div>

            <div className="username">
              <p className="group_member_username">
                {user.display_name} {this.isCurrentUser() ? '(Me)' : null}
              </p>
            </div>
            {this.isCurrentUser() ? (
              <div className="option_container" onClick={this.leaveGroup}>
                <div className="leaveGroup glyphicon glyphicon-log-out white">
                  <span className="tooltiptext">Leave Group</span>
                </div>
              </div>
            ) : null}
          </span>
        </li>
      );
    } else {
      return null;
    }
  }
}

export default compose(
  withTracker(props => {
    const userReady = Meteor.subscribe(
      'usersBySpotifyId',
      props.userId
    ).ready();
    return {
      user: userReady
        ? Meteor.users.findOne({ 'profile.id': props.userId }).profile
        : null
    };
  }),
  connect(
    null,
    { leaveGroup }
  )
)(GroupMember);
