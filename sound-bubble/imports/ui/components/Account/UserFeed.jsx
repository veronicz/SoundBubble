import React, { Component } from 'react';
import Song from '../Song';
import '../../stylesheets/Account.css';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { fetchMySongLogs } from '../../actions/accountActions';
import UserSongs from '../../../api/userSongs';

const DEFAULT_LIMIT = 20;
const LIMIT_INCREMENT = 20;
const limit = new ReactiveVar(DEFAULT_LIMIT);

class UserFeed extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.myRecentTracksReady;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const songLogs = document.getElementById('song_logs');
    if (this.isBottom(songLogs) && this.props.myTracksCount > limit.get()) {
      limit.set(limit.get() + LIMIT_INCREMENT);
    }
  };

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  getSongDetails() {
    const { myRecentTracks } = this.props;
    console.log('myrecent', myRecentTracks);
    return myRecentTracks.map(t => {
      return <Song key={t._id} track={t} />;
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
        <div className="songs" id="song_logs">
          <ul>{this.getSongDetails()}</ul>
        </div>
      </div>
    );
  }
}

export default compose(
  withTracker(props => {
    const myTracksCountReady = Meteor.subscribe('mySongLogsCount').ready();
    const myRecentTracksReady = Meteor.subscribe(
      'myRecentTracks',
      limit.get()
    ).ready();
    return {
      myTracksCount: myTracksCountReady
        ? Counts.get('mySongLogsCount')
        : Number.POSITIVE_INFINITY,
      myRecentTracksReady: myRecentTracksReady,
      myRecentTracks: myRecentTracksReady
        ? UserSongs.find(
            { userId: Meteor.user().profile.id, timestamps: { $exists: true } },
            { sort: { timestamps: -1 } }
          ).fetch()
        : []
    };
  }),
  connect(
    null,
    { fetchMySongLogs }
  )
)(UserFeed);
