import '../spotify-api';
import { getRecentlyPlayed } from './commonMethods';
import Groups from '../../imports/api/groups';

Meteor.methods({
  getGroupRecentlyPlayed: function(group) {
    return updateGroupRencentlyPlayed(group);
  }
});

function updateGroupRencentlyPlayed(groupId) {
  let userIds = Groups.findOne({ _id: groupId }).userIds;
  let tracks = [];
  userIds.forEach(userId => {
    let tokens = {};
    try {
      tokens = getTokensForUser(userId);
    } catch (error) {
      throw new Meteor.Error(error);
    }
    tracks = tracks.concat(getRecentlyPlayed(userId, tokens));
  });
  return tracks;
}

function getTokensForUser(userId) {
  let user = Meteor.users.findOne({ 'profile.id': userId });
  if (!user) {
    throw `User with id: ${userId} is not in the database`;
  }
  return {
    accessToken: user.services.spotify.accessToken,
    refreshToken: user.services.spotify.refreshToken
  };
}
