import React, { Component } from 'react';
import Song from './Song.jsx';
import { connect } from 'react-redux';
import { fetchMySongLogs } from '../../actions/Home';

class SongLog extends Component {
  getSongDetails(s, i) {
    const { profiles } = this.props;
    let randIndex = Math.floor(Math.random() * 5);
    let randProfile = profiles[randIndex];
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
      <Song
        key={i}
        userName={randProfile.username}
        userImage={randProfile.profile_photo}
        songName={song.name}
        songArtist={artistNames}
        songAlbumCover={song.album.images[0].url}
        songTimeStampTime={s.played_at.substring(11, 16)}
        songTimeStampDate={s.played_at.substring(0, 10)}
        songExternalUrl={songUrl}
        upAmount={s.upAmount}
        downAmount={s.downAmount}
        voteState={s.voteState}
        id={i}
      />
    );
  }

  render() {
    const { tracks, fetchMySongLogs } = this.props;
    let songDivs = tracks.map((s, i) => this.getSongDetails(s, i));

    return (
      <div className="feed_container">
        <div className="song_feed_header">
          <h1 className="song_feed_title">Your Feed</h1>
          <div
            className="refresh_button"
            onClick={() => fetchMySongLogs()}>
            <div className="option_container" onClick={() => this.createGroup()}><div className="glyphicon glyphicon-refresh white"><span className="tooltiptext">Refresh</span></div></div>
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
            <a className="dropdown-item" href="#">
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
  return { tracks: state.tracks, profiles: state.profiles };
};

export default connect(
  mapStateToProps,
  { fetchMySongLogs }
)(SongLog);
