import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideMySong } from '../../actions/accountActions';
import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import UserSongs from '../../../api/songs';

class HideSongButton extends Component {
  render() {
    const { hideMySong, song, show } = this.props;
    console.log(show)
    return (
      <div className="hide_song">
        <button
          className="hide_button"
          onClick={() =>
            hideMySong(
              song._id,
              show ? 'hide' : 'show'
            )
          }
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

export default compose(
  withTracker(props => {
    const hideStatusReady = Meteor.subscribe('currentUserSongs').ready();
    console.log(props.song._id)
    const userSong = UserSongs.findOne({
      songId: props.song._id
    })
    console.log(userSong)
    
    return {
      show: hideStatusReady && userSong ? userSong.show : true
    };
  }), connect(
    null,
    { hideMySong }
  )
)(HideSongButton);
