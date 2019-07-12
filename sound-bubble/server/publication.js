Meteor.publish('mySongs', function() {
  if (!this.userId) {
    return this.ready();
  }
  return UserSongs.find({ userId: Meteor.user().profile.id });
});

Meteor.publish('groupSongs', function(groupId) {
  if (!this.userId) {
    return this.ready();
  }
  return GroupSongs.find({ groupId: groupId });
});

Meteor.publish('songsById', function(songId) {
  if (!this.userId) {
    return this.ready();
  }
  return Songs.find({ _id: songId });
});

Meteor.publish('usersBySpotifyId', function(userId) {
  if (!this.userId) {
    return this.ready();
  }
  return Meteor.users.find({ 'profile.id': userId });
});

Meteor.publish('myGroups', function() {
  if (!this.userId) {
    return this.ready();
  }
  return Groups.find({ userIds: Meteor.user().profile.id });
});
