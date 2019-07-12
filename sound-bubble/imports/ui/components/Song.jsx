import React, { Component } from 'react';
import Vote from './Home/Vote.jsx';
import HideSongButton from './Account/HideSongButton';
import { withTracker } from 'meteor/react-meteor-data';

// This class has the following inherited props:
// track (required)
// home (boolean, whether this component is showing on the home page)

class Song extends Component {
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

  renderVoteOrHide(song) {
    const { home } = this.props;
    if (home) {
      return <Vote song={song} />;
    } else {
      return <HideSongButton song={song} />;
    }
  }

  render() {
    const { track, song, home } = this.props;
    if (song) {
      let albumImage =
        song.albumCover ||
        'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png';

      let songArtists = song.artists.join(' & ');

      return (
        <li className="song_card_container">
          <span className="song_card">
            {home ? this.userInfo() : null}

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
                behaviour="alternate"
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

            {this.renderVoteOrHide(song)}

            <div className="time_stamp">
              <h3 className="time_stamp_stamp">
                {track.timestamps.toISOString().substring(11, 16)}
              </h3>
              <h3 className="time_stamp_played_at">
                {track.timestamps.toISOString().substring(0, 10)}
              </h3>
            </div>
          </span>
        </li>
      );
    }
    return null;
  }
}

export default withTracker(props => {
  const songId = props.track.songId;
  const userId = props.track.userId;
  const songReady = Meteor.subscribe('songsById', songId).ready();
  const userReady = Meteor.subscribe('usersBySpotifyId', userId).ready();
  return {
    song: songReady ? Songs.findOne({ _id: songId }) : null,
    user: userReady
      ? Meteor.users.findOne({ 'profile.id': userId }).profile
      : null
  };
})(Song);
