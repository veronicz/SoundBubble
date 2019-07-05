import React, { Component } from 'react';
import Song from './Song.jsx';
import { connect } from 'react-redux';
import { fetchGroupSongLogs } from '../../actions/homeActions';
import Songs from '../../../api/songs';
import GroupButton from './GroupButton';

class SongLog extends Component {
  getSongDetails() {
    return this.props.groupRecentTracks.map(t => {
      let user = Meteor.users.findOne({ 'profile.id': t.userId }).profile;
      let song = Songs.findOne({ _id: t.songId });
      let timestamp = t.timestamps;
      return (
        <Song
          key={song.id + user.id + timestamp}
          song={song}
          user={user}
          timestamp={timestamp}
          upvoteCount={0} //TODO
          downvoteCount={0} //TODO
          voteState={1} //TODO
        />
      );
    });
  }

  render() {
    return (
      <div className="feed_container">
        <div className="song_feed_header">
          <h1 className="song_feed_title">Your Feed</h1>
          <div
            className="refresh_button"
            onClick={() => this.props.fetchGroupSongLogs()}
          >
            <div className="option_container">
              <div className="glyphicon glyphicon-refresh white">
                <span className="tooltiptext">Refresh</span>
              </div>
            </div>
          </div>
        </div>

        <GroupButton />

        <div className="songs">
          <ul>{this.getSongDetails()}</ul>
        </div>
        <div className="show_more_button_container">
          <button className="btn btn-secondary btn-sm"> Show More </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('allTracks', state.tracks);
  console.log('usersInGroup', state.usersInGroup);
  return {
    groupRecentTracks: state.tracks.filter(t =>
      state.usersInGroup.includes(t.userId)
    )
  };
};

export default connect(
  mapStateToProps,
  { fetchGroupSongLogs }
)(SongLog);
