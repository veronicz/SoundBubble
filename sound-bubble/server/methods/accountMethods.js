import '../spotify-api';
import { getRecentlyPlayed } from './commonMethods';

Meteor.methods({
  getMyRecentlyPlayed: function() {
    return getRecentlyPlayed(Meteor.user().profile.id);
  }
});
