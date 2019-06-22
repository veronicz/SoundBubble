import React from 'react';
import Vote from './Vote.jsx';

// This class has the following inherited props:
// userName
// userImage
// songName
// songArtist
// songAlbumCover
// songTimeStampTime
// songTimeStampDate
// songExternalUrl


export default class Song extends React.Component {

    render() {
        let externalUrl = this.props.songExternalUrl;
        let albumImage = this.props.songAlbumCover;


        if (this.props.userImage === ""){
            this.props.userImage ="https://www.loginradius.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";
        }

        if (this.props.albumCover === ""){
            this.props.albumCover = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png";
        }

        return (
            <li className="song_card_container">
                <span className="song_card">
                    <div className="photo_username">
                        <div className="profile_photo">
                            <img className="user_photo" src={this.props.userImage} onClick={() => {window.open(this.props.userImage.toString(), 'popup', 'width=650,height=450' ); return false;}}/>
                        </div>

                        <div className="username">
                        <p className="username_name">
                        {this.props.userName}
                        </p>
                        </div>
                    </div>

                    <div className="album_cover">
                        <img className="album_image" src={this.props.songAlbumCover} onClick={() => {window.open(albumImage.toString(), 'popup', 'width=400,height=400' ); return false;}}></img>
                    </div>

                    <div className="song_details">
                        <marquee behaviour="alternate" onClick={() => {window.open(externalUrl.toString(), 'popup', 'width=650,height=450' ); return false;}}>{this.props.songName} by {this.props.songArtist}</marquee>
                    </div>

                    <Vote></Vote>

                    <div className="time_stamp">
                        <h3 className="time_stamp_stamp">
                        {this.props.songTimeStampTime}
                        </h3>
                        <h3 className="time_stamp_played_at">
                        {this.props.songTimeStampDate}
                        </h3>
                    </div>
                                    
                </span>
        </li>);
}
                                
}