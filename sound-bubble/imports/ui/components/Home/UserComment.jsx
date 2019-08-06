import React from 'react';
import '../../stylesheets/main.css';
import { withTracker } from 'meteor/react-meteor-data';

// Inherited props:
// userId
// comment
// timeStamp

class UserComment extends React.Component {
  render() {
    const { user } = this.props;
    if (user) {
      let userImage =
        (user.images[0] && user.images[0].url) ||
        'https://www.loginradius.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';

      return (
        <div className="user-comment">
          <img className="user-comment-image" src={userImage} />
          <div className="text-timestamp-container">
            <p className="comment-username">
              <strong>{user.display_name}</strong> commented:
              <br />
            </p>

            <p className="comment-text">
              <br /> {this.props.comment}
            </p>
            <div className="comment-timestamp-container">
              <p className="comment-timestamp">
                {this.props.timeStamp.toString().substring(4, 21)}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withTracker(props => {
  const userId = props.userId;
  const userReady = Meteor.subscribe('usersBySpotifyId', userId).ready();
  return {
    user: userReady
      ? Meteor.users.findOne({ 'profile.id': userId }).profile
      : null
  };
})(UserComment);
