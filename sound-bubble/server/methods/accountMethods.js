import '../spotify-api';
import { getRecentlyPlayed } from './commonMethods';
import UserSongs from '../../imports/api/userSongs';

Meteor.methods({
  getMyRecentlyPlayed: function() {
    return getRecentlyPlayed(Meteor.user().profile.id);
  },
  hideMySong: function(song,user, option) {
    hideOrShowMySong(song,user,option)
    return getRecentlyPlayed(Meteor.user().profile.id)
}});

function hideOrShowMySong(song,user,option){
  if(option === 'show'){
    UserSongs.update(
      {
        userId: user,
        songId: song
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
        userId: user,
        songId: song
      },
      {
        $set: {
          show: false
        }
      }
    )
  }
}