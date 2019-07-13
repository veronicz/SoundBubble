import React, { Component } from 'react';
import Song from '../Song';
import '../../stylesheets/Account.css';
import { connect } from 'react-redux';
import { fetchMySongLogs } from '../../actions/accountActions';

class UserFeed extends Component {
  componentDidMount() {
    this.props.fetchMySongLogs();
  }

  getSongDetails() {
    const { myRecentTracks } = this.props;
    return myRecentTracks.map(t => {
      return <Song key={t.songId + t.timestamps} track={t} />;
    });
  }

  render() {
    return (
      <div className="feed_container">
        <div className="song_feed_header">
          <h1 className="song_feed_title">My Played Tracks</h1>
          <img
            className="refresh_button"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5rIE754i5dhUenkMUyG-JulFFkR78v3yt0TS-tbqiKCsr4Uj"
            onClick={() => this.props.fetchMySongLogs()}
          />
        </div>
        <div className="songs">
          <ul>{this.getSongDetails()}</ul>
        </div>
        <div className="show_more_button_container">
          <button className="feed_button btn btn-secondary btn-lg"> Show More </button>
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
