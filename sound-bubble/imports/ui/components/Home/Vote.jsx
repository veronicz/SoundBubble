import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { vote } from '../../actions/homeActions';
import UserSongs from '../../../api/userSongs';
import GroupSongs from '../../../api/groupSongs';
import { Meteor } from 'meteor/meteor';

class Vote extends React.Component {
  render() {
    const { song, voteState, groupUpvote, groupDownvote, vote } = this.props;
    let songId = song._id;
    let upvoteCount = groupUpvote || voteState === 1 ? 1 : 0; //use user's own vote if groupVote does not exist
    let downvoteCount = groupDownvote || voteState === -1 ? 1 : 0;

    if (voteState === 1) {
      return (
        <div className="votes">
          <div onClick={() => vote(songId, 2)} className="voteButton">
            <div
              className="glyphicon glyphicon-thumbs-up"
              style={{ color: '#1db954' }}
            >
              <span className="tooltiptext">Undo Upvote</span>
            </div>
          </div>
          <span className='voteCount' style={{ color: '#1db954'}}>{upvoteCount}</span>
          <span className='voteCount'> / </span>
          <span className='voteCount' style={{ color: '#DC143C' }}>{downvoteCount}</span>
        </div>
      );
    }
    if (voteState === -1) {
      return (
        <div className="votes">
          <div onClick={() => vote(songId, 4)} className="voteButton">
            <div
              className="glyphicon glyphicon-thumbs-down"
              style={{ color: '#DC143C' }}
            >
              <span className="tooltiptext">Undo Downvote</span>
            </div>
          </div>
          <span className='voteCount' style={{ color: '#1db954'}}>{upvoteCount}</span>
          <span className='voteCount'> / </span>
          <span className='voteCount' style={{ color: '#DC143C' }}>{downvoteCount}</span>
        </div>
      );
    } else {
      return (
        <div className="votes">
          <div onClick={() => vote(songId, 1)} className="voteButton">
            <div className="glyphicon glyphicon-thumbs-up white">
              <span className="tooltiptext">Upvote</span>
            </div>
          </div>
          <span className="voteCount">{upvoteCount}</span>
          <div onClick={() => vote(songId, 3)} className="voteButton">
            <div className="glyphicon glyphicon-thumbs-down white">
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
    currentGroup: state.currentGroup
  };
};

export default compose(
  withTracker(props => {
    const songId = props.song._id;
    const currentGroup = props.currentGroup;

    const voteStateReady = Meteor.subscribe('mySongs').ready();
    const userSong = UserSongs.findOne({ songId: songId });
    const userSongExists = voteStateReady && userSong;

    const groupReady = currentGroup
      ? Meteor.subscribe('groupSongs', currentGroup._id).ready()
      : null;
    const groupSong = currentGroup
      ? GroupSongs.findOne({
          groupId: currentGroup._id,
          songId: songId
        })
      : null;
    const groupSongExists = groupReady && groupSong;
    return {
      voteState: userSongExists ? userSong.vote : 0,
      groupUpvote: groupSongExists ? groupSong.upvote : null,
      groupDownvote: groupSongExists ? groupSong.downvote : null
    };
  }),
  connect(
    mapStateToProps,
    { vote }
  )
)(Vote);
