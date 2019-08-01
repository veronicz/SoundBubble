import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { vote } from '../../actions/homeActions';
import UserSongs from '../../../api/userSongs';
import GroupSongs from '../../../api/groupSongs';
import { Meteor } from 'meteor/meteor';

class Vote extends React.Component {
  handleVote(voteAction) {
    const { song, voteState, vote } = this.props;
    let songId = song._id;
    if (voteAction === 'upvote') {
      if (voteState === 1) {
        vote(songId, 'undoUpvote');
        return;
      }
      if (voteState === -1) vote(songId, 'undoDownvote');
      vote(songId, 'upvote');
    } else {
      if (voteState === -1) {
        vote(songId, 'undoDownvote');
        return;
      }
      if (voteState === 1) vote(songId, 'undoUpvote');
      vote(songId, 'downvote');
    }
  }

  render() {
    const { voteState, groupUpvote, groupDownvote } = this.props;
    let upvoteCount = groupUpvote || (voteState === 1 ? 1 : 0); //use user's own vote if groupVote does not exist
    let downvoteCount = groupDownvote || (voteState === -1 ? 1 : 0);
    let upvoteTooltip = 'Upvote';
    let downvoteTooltip = 'Downvote';
    let upvoteClass = 'thumbsUp glyphicon glyphicon-thumbs-up white';
    let upvoteStyle = null;
    let downvoteClass = 'thumbsDown glyphicon glyphicon-thumbs-down white';
    let downvoteStyle = null;

    if (voteState === 1) {
      upvoteTooltip = 'Undo Upvote';
      upvoteClass = 'thumbsUp glyphicon glyphicon-thumbs-up green';
      upvoteStyle = { color: '#1db954' };
    } else if (voteState === -1) {
      downvoteTooltip = 'Undo Downvote';
      downvoteClass = 'thumbsDown glyphicon glyphicon-thumbs-down red';
      downvoteStyle = { color: 'red' };
    }

    return (
      <div className="votes">
        <div onClick={() => this.handleVote('upvote')} className="voteButton">
          <div className={upvoteClass} style={upvoteStyle}>
            <span className="tooltiptext">{upvoteTooltip}</span>
          </div>
        </div>
        <span className="voteCount">{upvoteCount}</span>
        <div onClick={() => this.handleVote('downvote')} className="voteButton">
          <div className={downvoteClass} style={downvoteStyle}>
            <span className="tooltiptext">{downvoteTooltip}</span>
          </div>
        </div>
        <span className="voteCount">{downvoteCount}</span>
      </div>
    );
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
