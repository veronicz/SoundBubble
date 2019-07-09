Meteor.publish('myGroupIds', function() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: { groupIds: 1 }
      }
    );
  } else {
    this.ready();
  }
});

Meteor.publish('currentUserSongs', function() {
  if (!this.userId) {
    return this.ready();
  }
  return UserSongs.find({ userId: Meteor.user().profile.id });
});

Meteor.publish('currentGroupSongs', function(groupId) {
  if (!this.userId) {
    return this.ready();
  }
  return GroupSongs.find({ groupId: groupId });
});

Meteor.publish('trackSong', function(songId) {
  if (!this.userId) {
    return this.ready();
  }
  return Songs.find({ _id: songId });
});

Meteor.publish('trackUser', function(userId) {
  if (!this.userId) {
    return this.ready();
  }
  return Meteor.users.find({ 'profile.id': userId });
});

Meteor.publish('mySongs', function(songIds) {
  if (!this.userId) {
    return this.ready();
  }
  return Songs.find({ _id: { $in: songIds } });
});

Meteor.publish('myGroups', function() {
  if (!this.userId) {
    return this.ready();
  }
  return Groups.find({ _id: { $in: Meteor.user().groupIds } });
});
