import React, { Component } from 'react';
import Song from '../Song';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { fetchGroupSongLogs } from '../../actions/homeActions';
import GroupButton from './GroupButton';
import UserSongs from '../../../api/userSongs';
import Groups from '../../../api/groups';

const DEFAULT_LIMIT = 50;
const LIMIT_INCREMENT = 30;
const limit = new ReactiveVar(DEFAULT_LIMIT);

class SongLog extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.recentTracksReady;
  }

  getSongDetails() {
    return this.props.recentTracks.map(t => {
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
    if (this.isBottom(songLogs) && this.props.tracksCount > limit.get()) {
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

        <div className="songs">
          <ul className="song_logs" id="song_logs">{this.getSongDetails()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentGroupId: state.currentGroupId };
};

export default compose(
  connect(
    mapStateToProps,
    { fetchGroupSongLogs }
  ),
  withTracker(props => {
    const currentGroupId = props.currentGroupId;
    const currentGroupReady = currentGroupId
      ? Meteor.subscribe('group', currentGroupId).ready()
      : false;
    const currentGroup = currentGroupReady
      ? Groups.findOne({ _id: currentGroupId })
      : null;

    if (currentGroup) {
      const groupTracksCountReady = Meteor.subscribe(
        'groupSongLogsCount',
        currentGroup
      ).ready();
      const groupRecentTracksReady = Meteor.subscribe(
        'groupRecentTracks',
        currentGroup,
        limit.get()
      ).ready();
      return {
        tracksCount: groupTracksCountReady
          ? Counts.get('groupSongLogsCount')
          : Number.POSITIVE_INFINITY,
        recentTracksReady: groupRecentTracksReady,
        recentTracks: groupRecentTracksReady
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
    } else {
      //display current user's song logs
      const myTracksCountReady = Meteor.subscribe('mySongLogsCount').ready();
      const myRecentTracksReady = Meteor.subscribe(
        'myRecentTracks',
        limit.get()
      ).ready();
      return {
        tracksCount: myTracksCountReady
          ? Counts.get('mySongLogsCount')
          : Number.POSITIVE_INFINITY,
        recentTracksReady: myRecentTracksReady,
        recentTracks: myRecentTracksReady
          ? UserSongs.find(
              {
                userId: Meteor.user().profile.id,
                timestamps: { $exists: true }
              },
              { sort: { timestamps: -1 } }
            ).fetch()
          : []
      };
    }
  })
)(SongLog);
