import '../spotify-api';
import { getRecentlyPlayed } from './commonMethods';
import UserSongs from '../../imports/api/userSongs';

Meteor.methods({
  getMyRecentlyPlayed: function() {
    return getRecentlyPlayed(Meteor.user().profile.id);
  },
  hideMySong: function(songId, option) {
    updateHideStatus(songId,option);
}});

function updateHideStatus(songId,option){
  if(option === 'show'){
    UserSongs.update(
      {
        userId: Meteor.user().profile.id,
        songId: songId
      },
      {
        $set: {
          show: true
        }
      }
    )
  }else {
    UserSongs.update(
      {
        userId: Meteor.user().profile.id,
        songId: songId
      },
      {
        $set: {
          show: false
        }
      }
    )
  }
}