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
  shouldComponentUpdate(nextProps, nextState) {
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
          <ul>{this.getSongDetails()}</ul>
          <div className="show_more_button_container">
            <button
              className="btn btn-secondary btn-sm"
              onClick={this.loadMore}
            >
              Show More
            </button>
          </div>
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
    const groupRecentTracksReady = currentGroup
      ? Meteor.subscribe('groupRecentTracks', currentGroup, limit.get()).ready()
      : false;

    return {
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
