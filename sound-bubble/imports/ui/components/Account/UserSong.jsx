import React from 'react';

// This class has the following inherited props:
// songName
// songArtist
// songAlbumCover
// songTimeStampTime
// songTimeStampDate
// songExternalUrl

export default class UserSong extends React.Component {
  render() {
    let externalUrl = this.props.songExternalUrl;
    let albumImage = this.props.songAlbumCover;

    if (this.props.albumCover === '') {
      this.props.albumCover =
        'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png';
    }

    return (
      <li className="song_card_container">
        <span className="song_card">
          <div className="album_cover">
            <img
              className="album_image"
              src={this.props.songAlbumCover}
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
                  externalUrl.toString(),
                  'popup',
                  'width=650,height=450'
                );
                return false;
              }}
            >
              {this.props.songName} by {this.props.songArtist}
            </marquee>
          </div>

          <div className="hide_song">
            <button className="hide_button">Hide</button>
          </div>

          <div className="time_stamp">
            <h3 className="time_stamp_stamp">{this.props.songTimeStampTime}</h3>
            <h3 className="time_stamp_played_at">
              {this.props.songTimeStampDate}
            </h3>
          </div>
        </span>
      </li>
    );
  }
}
