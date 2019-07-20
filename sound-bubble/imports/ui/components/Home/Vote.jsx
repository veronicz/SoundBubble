import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { vote } from '../../actions/homeActions';
import UserSongs from '../../../api/userSongs';
import GroupSongs from '../../../api/groupSongs';
import '../../stylesheets/main.css';
import { Meteor } from 'meteor/meteor';

class Vote extends React.Component {
  render() {
    const { song, voteState, groupUpvote, groupDownvote, vote } = this.props;
    let songId = song._id;
    let upvoteCount = groupUpvote || (voteState === 1 ? 1 : 0); //use user's own vote if groupVote does not exist
    let downvoteCount = groupDownvote || (voteState === -1 ? 1 : 0);

    if (voteState === 1) {
      return (
        <div className="votes">
          <div onClick={() => vote(songId, 2)} className="voteButton">
            <div
              className="thumbsUp glyphicon glyphicon-thumbs-up green"
              style={{ color: '#1db954' }}
            >
              <span className="tooltiptext">Undo Upvote</span>
            </div>
          </div>
          <span className="voteCount" style={{ color: 'green' }}>
            {upvoteCount}
          </span>
          <div onClick={() => vote(songId, 3)} className="voteButton">
            <div className="thumbsDown glyphicon glyphicon-thumbs-down white">
              <span className="tooltiptext">Downvote</span>
            </div>
          </div>
          <span className="voteCount">{downvoteCount}</span>
        </div>
      );
    }
    if (voteState === -1) {
      return (
        <div className="votes">
          <div onClick={() => vote(songId, 1)} className="voteButton">
            <div className="thumbsUp glyphicon glyphicon-thumbs-up white">
              <span className="tooltiptext">Upvote</span>
            </div>
          </div>

          <span className="voteCount">{upvoteCount}</span>

          <div onClick={() => vote(songId, 4)} className="voteButton">
            <div
              className="thumbsDown glyphicon glyphicon-thumbs-down red"
              style={{ color: 'red' }}
            >
              <span className="tooltiptext">Undo Downvote</span>
            </div>
          </div>
          <span className="voteCount" style={{ color: 'red' }}>
            {downvoteCount}
          </span>
        </div>
      );
    } else {
      return (
        <div className="votes">
          <div onClick={() => vote(songId, 1)} className="voteButton">
            <div className="thumbsUp glyphicon glyphicon-thumbs-up white">
              <span className="tooltiptext">Upvote</span>
            </div>
          </div>
          <span className="voteCount">{upvoteCount}</span>
          <div onClick={() => vote(songId, 3)} className="voteButton">
            <div className="thumbsDown glyphicon glyphicon-thumbs-down white">
              <span className="tooltiptext">Downvote</span>
            </div>
          </div>
          <span className="voteCount">{downvoteCount}</span>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentGroupId: state.currentGroupId
  };
};

export default compose(
  connect(
    mapStateToProps,
    { vote }
  ),
  withTracker(props => {
    const songId = props.song._id;
    const currentGroupId = props.currentGroupId;

    const voteStateReady = Meteor.subscribe('myVote', songId).ready();
    const userSong = UserSongs.findOne({
      songId: songId,
      userId: Meteor.user().profile.id
    });
    const userSongExists = voteStateReady && userSong;

    const groupReady = currentGroupId
      ? Meteor.subscribe('groupSong', currentGroupId, songId).ready()
      : null;
    const groupSong = currentGroupId
      ? GroupSongs.findOne({
          groupId: currentGroupId,
          songId: songId
        })
      : null;
    const groupSongExists = groupReady && groupSong;

    return {
      voteState: userSongExists ? userSong.vote : 0,
      groupUpvote: groupSongExists ? groupSong.upvote : null,
      groupDownvote: groupSongExists ? groupSong.downvote : null
    };
  })
)(Vote);
