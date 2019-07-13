import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideMySong } from '../../actions/accountActions';
import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import UserSongs from '../../../api/userSongs';

class HideSongButton extends Component {
  render() {
    const { hideMySong, song, show } = this.props;
    return (
      <div className="hide_song">
        <button
          className="hide_button"
          onClick={() => hideMySong(song._id, show ? 'hide' : 'show')}
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

export default compose(
  withTracker(props => {
    const hideStatusReady = Meteor.subscribe('mySongs').ready();
    return {
      show: hideStatusReady
        ? UserSongs.findOne({ songId: props.song._id }).show
        : true
    };
  }),
  connect(
    null,
    { hideMySong }
  )
)(HideSongButton);
