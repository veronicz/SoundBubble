import React, { Component } from 'react';
import '../../stylesheets/Account.css';
import UserSong from './UserSong.jsx';
import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import UserSongs from '../../../api/userSongs';
import Songs from '../../../api/songs';
import { fetchMySongLogs } from '../../actions/account';

class UserFeed extends Component {
  sortSongLogsByTimeDesc(songs) {
    let result = [];
    songs.forEach(song => {
      song.timestamps.forEach(ts => {
        result.push({
          songId: song.songId,
          timestamp: ts
        });
      });
    });
    result.sort((a, b) => b.timestamp - a.timestamp);
    return result;
  }

  getSongDetails(song, timestamp) {
    let artistNames = song.artists.join(' & ');
    let albumCover =
      song.albumCover ||
      'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png';
    let songUrl =
      song.spotifyUrl ||
      'https://support.spotify.com/tr/article/Error-code-404/';
    return (
      <UserSong
        key={song._id + timestamp}
        songName={song.name}
        songArtist={artistNames}
        songAlbumCover={albumCover}
        songTimeStampTime={timestamp.toISOString().substring(11, 16)}
        songTimeStampDate={timestamp.toISOString().substring(0, 10)}
        songExternalUrl={songUrl}
      />
    );
  }

  render() {
    const { mySongs, songLogs, fetchMySongLogs } = this.props;

    let songDivs = this.sortSongLogsByTimeDesc(songLogs).map(sl =>
      this.getSongDetails(mySongs.find(s => s._id === sl.songId), sl.timestamp)
    );

    return (
      <div className="feed_container">
        <div className="song_feed_header">
          <h1 className="song_feed_title">My Played Tracks</h1>
          <img
            className="refresh_button"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5rIE754i5dhUenkMUyG-JulFFkR78v3yt0TS-tbqiKCsr4Uj"
            onClick={() => fetchMySongLogs()}
          />
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

export default compose(
  withTracker(props => {
    let played_songs = UserSongs.find(
      { userId: props.user.id, timestamps: { $ne: null } },
      { songId: 1, timestamps: 1 }
    ).fetch();
    return {
      songLogs: played_songs,
      mySongs: Songs.find({
        _id: { $in: played_songs.map(s => s.songId) }
      }).fetch()
    };
  }),
  connect(
    null,
    { fetchMySongLogs }
  )
)(UserFeed);
