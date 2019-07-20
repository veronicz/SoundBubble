import '../spotify-api';
import { getAllRecentlyPlayed } from './commonMethods';
import UserSongs from '../../imports/api/userSongs';

Meteor.methods({
  getMyRecentlyPlayed: function() {
    getAllRecentlyPlayed(Meteor.user().profile.id);
  },
  hideMySong: function(songId, option) {
    updateHideStatus(songId, option);
  }
});

function updateHideStatus(songId, option) {
  UserSongs.update(
    {
      userId: Meteor.user().profile.id,
      songId: songId
    },
    {
      $set: {
        show: option === 'show'
      }
    }
  );
}
