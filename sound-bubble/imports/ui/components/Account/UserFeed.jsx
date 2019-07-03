import React, { Component } from 'react';
import '../../stylesheets/Account.css';
import UserSong from './UserSong.jsx';
import { connect } from 'react-redux';
import { fetchMySongLogs } from '../../actions/Home';

class UserFeed extends Component {
  getSongDetails(s, i) {
    let song = s.track;
    let songUrl;

    if (s.context === null) {
      songUrl = 'https://support.spotify.com/tr/article/Error-code-404/';
    } else {
      songUrl = song.external_urls.spotify;
    }

    let artists = song.artists;
    let artistNames = artists.map(artist => artist.name).join(' & ');
    // TODO: calls below need to be made null safe

    return (
      <UserSong
        key={i}
        songName={song.name}
        songArtist={artistNames}
        songAlbumCover={song.album.images[0].url}
        songTimeStampTime={s.played_at.substring(11, 16)}
        songTimeStampDate={s.played_at.substring(0, 10)}
        songExternalUrl={songUrl}
      />
    );
  }

  render() {
    const { tracks, fetchMySongLogs } = this.props;
    let songDivs = tracks.map((s, i) => this.getSongDetails(s, i));

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

const mapStateToProps = state => {
  return { tracks: state.tracks };
};

export default connect(
  mapStateToProps,
  { fetchMySongLogs }
)(UserFeed);
