import React, { Component } from 'react';
import Song from '../Song';
import { connect } from 'react-redux';
import { fetchGroupSongLogs } from '../../actions/homeActions';
import Songs from '../../../api/songs';
import GroupButton from './GroupButton';
import '../../stylesheets/main.css';

class SongLog extends Component {
  getSongDetails() {
    return this.props.groupRecentTracks
      .filter(t => t.show)
      .map(t => {
        return (
          <Song
            key={t.songId + t.userId + t.timestamps}
            track={t}
            home={true}
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
          <div className="show_more_button_container">
          <button className="feed_button btn btn-secondary btn-lg"> Show More </button>
        </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('allTracks', state.tracks);
  return {
    groupRecentTracks: state.tracks.filter(t => {
      if (state.currentGroup) {
        return state.currentGroup.userIds.includes(t.userId);
      } else {
        //user is not in any group, display own songs
        return t.userId === Meteor.user().profile.id;
      }
    }),
    currentGroup: state.currentGroup
  };
};

export default connect(
  mapStateToProps,
  { fetchGroupSongLogs }
)(SongLog);
