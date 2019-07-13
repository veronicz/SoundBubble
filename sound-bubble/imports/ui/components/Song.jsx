import React, { Component } from 'react';
import Vote from './Home/Vote.jsx';
import HideSongButton from './Account/HideSongButton';
import '../stylesheets/main.css';

// This class has the following inherited props:
// song (required)
// user (optional)
// Note: - this corresponds to users.services.spotify in the db
//       - every field on user has a null check
// show (required if user is null)

export default class Song extends Component {
  userInfo() {
    const { user } = this.props;
    if (user && user.display_name) {
      let userImage =
        (user.images[0] && user.images[0].url) ||
        'https://www.loginradius.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';

      return (
        <div className="photo_username">
          <div className="profile_photo">
            <img
              className="user_photo"
              src={userImage}
              onClick={() => {
                window.open(
                  userImage.toString(),
                  'popup',
                  'width=650,height=450'
                );
                return false;
              }}
            />
          </div>

          <div className="username">
            <p className="username_name">{user.display_name}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { song, timestamp, user } = this.props;

    let albumImage =
      song.albumCover ||
      'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png';

    let songArtists = song.artists.join(' & ');

    return (
      <li className="song_card_container">
        <span className="song_card">
          {this.userInfo()}

          <div className="album_cover">
            <img
              className="album_image"
              src={albumImage}
              onClick={() => {
                window.open(
                  albumImage.toString(),
                  'popup',
                  'width=400,height=400'
                );
                return false;
              }}
            />
          </div>

          <div className="song_details">
            <marquee
              onClick={() => {
                window.open(
                  song.spotifyUrl.toString(),
                  'popup',
                  'width=650,height=450'
                );
                return false;
              }}
            >
              {song.name} by {songArtists}
            </marquee>
          </div>

          {user ? <Vote song={song} /> : null}

          {this.props.user ? null : (
            <HideSongButton show={this.props.show} targetSong={song._id} />
          )}

          <div className="time_stamp">
            <h3 className="time_stamp_stamp">
              {timestamp.toISOString().substring(11, 16)}
            </h3>
            <h3 className="time_stamp_played_at">
              {timestamp.toISOString().substring(2, 10)}
            </h3>
          </div>
        </span>
      </li>
    );
  }
}
