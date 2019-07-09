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

Meteor.publish('user_songs.vote', function() {
  if (!this.userId) {
    return this.ready();
  }

  return UserSongs.find(
    {
      userId: this.userId
    },
    {
      fields: { vote: 1 }
    }
  );
});

Meteor.publish('group_songs', function() {
  if (!this.userId) {
    return this.ready();
  }

  return GroupSongs.find(
    {
      groupId: { $in: Meteor.user().groupIds }
    },
    {
      fields: { upvote: 1, downvote: 1 }
    }
  );
});
