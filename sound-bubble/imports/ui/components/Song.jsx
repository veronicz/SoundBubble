import React, { Component } from 'react';
import Vote from './Home/Vote.jsx';
import HideSongButton from './Account/HideSongButton';
import '../stylesheets/main.css';
import { withTracker } from 'meteor/react-meteor-data';
import Songs from '../../api/songs';

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

  renderVoteOrHide() {
    const { track, song, home } = this.props;
    if (home) {
      return <Vote song={song} />;
    } else {
      return <HideSongButton song={song} show={track.show} />;
    }
  }

  parseTimeStamp(datetime){
    //format time and date
    let hours = datetime.getHours();
    let minutes = datetime.getMinutes();

    let time = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);

    let month = datetime.getMonth();
    let day = datetime.getDate();
    let year = datetime.getFullYear().toString().substring(2,4);

    let date = (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + year;

    return ({
      date: date,
      time: time
    });
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

            {this.renderVoteOrHide()}


            <div className="time_stamp">
              <h3 className="time_stamp_stamp">
                {this.parseTimeStamp(track.timestamps).time}
              </h3>
              <h3 className="time_stamp_played_at">
                {this.parseTimeStamp(track.timestamps).date}
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
