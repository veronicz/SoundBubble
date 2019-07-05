import React, { Component } from 'react';
import Song from './Song.jsx';
import { connect } from 'react-redux';
import { fetchGroupSongLogs } from '../../actions/homeActions';
import { changeCurrentGroup } from '../../actions/groupsActions';
import Groups from '../../../api/groups';
import Songs from '../../../api/songs';

class SongLog extends Component {
  getSongDetails(track, timestamp) {
    let user = Meteor.users.findOne({ 'profile.id': track.userId }).profile;
    let song = Songs.findOne({ _id: track.songId });

    let artistNames = song.artists.join(' & ');
    let albumCover =
      song.albumCover ||
      'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png';
    let songUrl =
      song.spotifyUrl ||
      'https://support.spotify.com/tr/article/Error-code-404/';

    return (
      <Song
        key={song._id + user.id + timestamp}
        userName={user.display_name}
        userImage={user.images[0].url}
        songName={song.name}
        songArtist={artistNames}
        songAlbumCover={albumCover}
        songTimeStampTime={timestamp.toISOString().substring(11, 16)}
        songTimeStampDate={timestamp.toISOString().substring(0, 10)}
        songExternalUrl={songUrl}
        upAmount={0}
        downAmount={0}
        voteState={null}
      />
    );
  }

  render() {
    const {
      groupRecentTracks,
      fetchGroupSongLogs,
      changeCurrentGroup
    } = this.props;
    let songLogs = Songs.find({
      _id: { $in: groupRecentTracks.map(t => t.songId) }
    }).fetch();
    let songDivs = groupRecentTracks.map(t =>
      this.getSongDetails(t, t.timestamps)
    );

    return (
      <div className="feed_container">
        <div className="song_feed_header">
          <h1 className="song_feed_title">Your Feed</h1>
          <div className="refresh_button" onClick={() => fetchGroupSongLogs()}>
            <div className="option_container">
              <div className="glyphicon glyphicon-refresh white">
                <span className="tooltiptext">Refresh</span>
              </div>
            </div>
          </div>
        </div>

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
            <a
              className="dropdown-item"
              href="#"
              onClick={() => changeCurrentGroup('1')}
            >
              Group 1
            </a>
            <a className="dropdown-item" href="#">
              Group 2
            </a>
            <a className="dropdown-item" href="#">
              Group 3
            </a>
          </div>
        </div>

        <div className="songs">
          <ul>{songDivs}</ul>
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
  { fetchGroupSongLogs, changeCurrentGroup }
)(SongLog);
