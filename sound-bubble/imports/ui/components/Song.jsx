import React, { Component } from 'react';
import Vote from './Home/Vote.jsx';
import HideSongButton from './Account/HideSongButton';
import '../stylesheets/main.css';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import Songs from '../../api/songs';
import Comments from './Home/Comments.jsx';

// This class has the following inherited props:
// track (required)
// home (boolean, whether this component is showing on the home page)

class Song extends Component {
  constructor() {
    super();
    this.state = {
      showComments: false
    };
  }

  showComments = () => {
    this.setState({ showComments: true });
  };

  hideComments = () => {
    this.setState({ showComments: false });
  };

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

  renderCommentsButton() {
    const { home, currentGroupId, groupSong } = this.props;
    let count  = groupSong ? (groupSong.comments ? groupSong.comments.length: 0): 0;

    if (home && currentGroupId) {
      if (!this.state.showComments) {
        return (<div className="comments_and_count"><div onClick={() => this.showComments()} className="voteButton">
        <div
          className="comments_button glyphicon glyphicon-comment"
          style={{ color: 'white' }}
        >
          <span className="tooltiptext">Open Comments</span>
        </div>
      </div>
        <div className="comments_count">{count}</div></div>);
      } else {
        return (<div className="comments_and_count"><div onClick={() => this.hideComments()} className="voteButton">
          <div
            className="comments_button glyphicon glyphicon-comment"
            style={{ color: '#1db954' }}
          >
            <span className="tooltiptext">Close</span>
          </div>
        </div>
          <div className="comments_count">{count}</div></div>);
      }
    } else {
      return <div />;
    }
  }

  render() {
    const { track, song, groupSong, home, filterKey, user } = this.props;
    if (song) {

    let albumImage =
    song.albumCover ||
    'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png';

    let songArtists = song.artists.join(' & ');

    let comments = this.state.showComments ? (
      <Comments
        songId={song._id}
        comments={groupSong ? groupSong.comments || [] : []}
      />
    ) : null;


      if(home && !(song.name.toLowerCase().includes(filterKey.toLowerCase())) && user && !(user.display_name.toLowerCase().includes(filterKey.toLowerCase())) && !(songArtists.toLowerCase().includes(filterKey.toLowerCase()))){
        return null;
      }

      return (
        <div className="song_and_comments">
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
              {this.renderCommentsButton()}
              <div className="time_stamp">
                <h3 className="time_stamp_stamp">
                  {track.timestamps.toString().substring(16, 21)}
                </h3>
                <h3 className="time_stamp_played_at">
                  {track.timestamps.toString().substring(4, 15)}
                </h3>
              </div>
            </span>
          </li>

          {comments}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    currentGroupId: state.currentGroupId
  };
};

export default compose(
  connect(mapStateToProps),
  withTracker(props => {
    const songId = props.track.songId;
    const userId = props.track.userId;
    const currentGroupId = props.currentGroupId;
    const songReady = Meteor.subscribe('songsById', songId).ready();
    const groupReady = currentGroupId
      ? Meteor.subscribe('groupSong', currentGroupId, songId).ready()
      : false;
    const userReady = Meteor.subscribe('usersBySpotifyId', userId).ready();
    console.log(userReady);
    return {
      song: songReady ? Songs.findOne({ _id: songId }) : null,
      groupSong: groupReady
        ? GroupSongs.findOne({
            groupId: currentGroupId,
            songId: songId
          })
        : null,
      user: userReady
        ? Meteor.users.findOne({ 'profile.id': userId }).profile
        : null
    };
  })
)(Song);
