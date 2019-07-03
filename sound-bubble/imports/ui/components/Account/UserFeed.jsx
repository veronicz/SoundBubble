import React, { Component } from 'react';
import '../../stylesheets/Account.css';
import UserSong from './UserSong.jsx';
import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import UserSongs from '../../../api/userSongs';
import Songs from '../../../api/songs';
import { fetchMySongLogs } from '../../actions/Home';

class UserFeed extends Component {
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
    const { mySongs, played_at, fetchMySongLogs } = this.props;
    let songDivs = mySongs.map((s, i) =>
      played_at[i].timestamps.map(ts => this.getSongDetails(s, ts))
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
      { songId: 1, timestamp: 1 }
    ).fetch();
    return {
      played_at: played_songs,
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
