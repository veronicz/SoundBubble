import React, { Component } from 'react';
import Song from '../Song';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { fetchGroupSongLogs } from '../../actions/homeActions';
import GroupButton from './GroupButton';
import UserSongs from '../../../api/userSongs';

const DEFAULT_LIMIT = 50;
const LIMIT_INCREMENT = 30;
const limit = new ReactiveVar(DEFAULT_LIMIT);

class SongLog extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.groupRecentTracksReady;
  }

  loadMore = e => {
    if (e) e.preventDefault();
    limit.set(limit.get() + LIMIT_INCREMENT);
  };

  getSongDetails() {
    console.log('groupRecent', this.props.groupRecentTracks);
    return this.props.groupRecentTracks.map(t => {
      return <Song key={t._id + t.userId} track={t} home={true} />;
    });
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const songLogs = document.getElementById('song_logs');
    console.log(this.props.groupTracksCount);
    if (this.isBottom(songLogs) && this.props.groupTracksCount > limit.get()) {
      limit.set(limit.get() + LIMIT_INCREMENT);
    }
  };

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    return (
      <div className="feed_container">
        <div className="song_feed_header">
          <h1 className="song_feed_title">Your Feed</h1>
          <div
            className="refresh_button"
            onClick={() => this.props.fetchGroupSongLogs()}
          >
            <div className="option_container">
              <div className="glyphicon glyphicon-refresh white">
                <span className="tooltiptext">Refresh</span>
              </div>
            </div>
          </div>
        </div>

        <GroupButton />

        <div className="songs" id="song_logs">
          <ul>{this.getSongDetails()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentGroup: state.currentGroup };
};

export default compose(
  connect(
    mapStateToProps,
    { fetchGroupSongLogs }
  ),
  withTracker(props => {
    const currentGroup = props.currentGroup;
    const groupTracksCountReady = currentGroup
      ? Meteor.subscribe('groupSongLogsCount', currentGroup).ready()
      : false;
    const groupRecentTracksReady = currentGroup
      ? Meteor.subscribe('groupRecentTracks', currentGroup, limit.get()).ready()
      : false;

    return {
      groupTracksCount: groupTracksCountReady
        ? Counts.get('groupSongLogsCount')
        : Number.POSITIVE_INFINITY,
      groupRecentTracksReady: groupRecentTracksReady,
      groupRecentTracks: groupRecentTracksReady
        ? UserSongs.find(
            {
              userId: { $in: currentGroup.userIds },
              show: true,
              timestamps: { $exists: true }
            },
            { sort: { timestamps: -1 } }
          ).fetch()
        : []
    };
  })
)(SongLog);
