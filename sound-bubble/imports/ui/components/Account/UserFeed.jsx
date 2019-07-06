import React, { Component } from 'react';
import Song from '../Home/Song.jsx';
import '../../stylesheets/Account.css';
import { connect } from 'react-redux';
import { fetchMySongLogs } from '../../actions/accountActions';

class UserFeed extends Component {
  componentDidMount() {
    this.props.fetchMySongLogs();
  }

  getSongDetails() {
    const { myRecentTracks } = this.props;
    let songLogs = Songs.find({
      _id: { $in: myRecentTracks.map(t => t.songId) }
    }).fetch();

    return myRecentTracks.map(t => {
      let song = songLogs.find(s => s._id === t.songId);
      let timestamp = t.timestamps;
      let show = t.show;
      return (
        <Song
          key={song.id + timestamp}
          song={song}
          timestamp={timestamp}
          show={show}
        />
      );
    });
  }

  render() {
    const
    return (
      <div className="feed_container">
        <div className="song_feed_header">
          <h1 className="song_feed_title">My Played Tracks</h1>
          <img
            className="refresh_button"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5rIE754i5dhUenkMUyG-JulFFkR78v3yt0TS-tbqiKCsr4Uj"
            onClick={() => this.propsfetchMySongLogs()}
          />
        </div>
        <div className="songs">
          <ul>{this.getSongDetails()}</ul>
        </div>
        <div className="show_more_button_container">
          <button className="btn btn-secondary btn-sm"> Show More </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myRecentTracks: state.tracks.filter(
      t => t.userId === Meteor.user().profile.id
    )
  };
};

export default connect(
  mapStateToProps,
  { fetchMySongLogs }
)(UserFeed);
