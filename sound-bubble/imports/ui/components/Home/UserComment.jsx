import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import CommentDetail from './CommentDetail';

// Inherited props:
// userId
// comment
// timeStamp

class UserComment extends React.Component {
  state = { showDetail: false };

  handleUserImageClick = () => {
    if (Meteor.user().profile.id === this.props.comment.userId) {
      this.setState({ showDetail: true });
    }
  };

  handleCloseDetail = () => {
    this.setState({ showDetail: false });
  };

  render() {
    const { user, comment, songId } = this.props;
    if (user) {
      let userImage =
        (user.images[0] && user.images[0].url) ||
        'https://www.loginradius.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
      return (
        <div className="user-comment">
          {this.state.showDetail ? (
            <CommentDetail
              comment={comment}
              close={this.handleCloseDetail}
              songId={songId}
            />
          ) : null}
          <img
            className="user-comment-image"
            src={userImage}
            onClick={this.handleUserImageClick}
          />
          <div className="text-timestamp-container">
            <p className="comment-username">
              <strong>{user.display_name}</strong> commented:
              <br />
            </p>

            <p className="comment-text">
              <br /> {comment.message}
            </p>
            <div className="comment-timestamp-container">
              <p className="comment-timestamp">
                {comment.createdAt.toString().substring(4, 21)}
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
  const userId = props.comment.userId;
  const userReady = Meteor.subscribe('usersBySpotifyId', userId).ready();
  return {
    user: userReady
      ? Meteor.users.findOne({ 'profile.id': userId }).profile
      : null
  };
})(UserComment);
