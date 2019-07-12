import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';

Meteor.publish('myVote', function(songId) {
  if (!this.userId) {
    return this.ready();
  }
  return UserSongs.find(
    { userId: Meteor.user().profile.id, songId: songId },
    { fields: { timestamps: 0 } }
  );
});

Meteor.publish('groupSong', function(groupId, songId) {
  if (!this.userId) {
    return this.ready();
  }
  return GroupSongs.find({ groupId: groupId, songId: songId });
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

Meteor.publish('myRecentTracks', function(limit = 10) {
  if (!this.userId) {
    return this.ready();
  }
  return ReactiveAggregate(this, UserSongs, [
    {
      $match: {
        userId: Meteor.user().profile.id,
        timestamps: { $exists: true }
      }
    },
    {
      $unwind: {
        path: '$timestamps',
        includeArrayIndex: 'suffix'
      }
    },
    {
      $project: {
        _id: {
          $concat: [
            '$_id',
            '_',
            {
              $substr: ['$suffix', 0, -1]
            }
          ]
        },
        userId: 1,
        songId: 1,
        vote: 1,
        timestamps: 1,
        show: 1
      }
    },
    { $sort: { timestamps: -1 } },
    { $limit: limit }
  ]);
});

Meteor.publish('groupRecentTracks', function(group, limit = 50) {
  if (!this.userId) {
    return this.ready();
  }

  return ReactiveAggregate(this, UserSongs, [
    {
      $match: {
        userId: { $in: group.userIds },
        show: true,
        timestamps: { $exists: true }
      }
    },
    {
      $unwind: {
        path: '$timestamps',
        includeArrayIndex: 'suffix'
      }
    },
    {
      $project: {
        _id: {
          $concat: [
            '$_id',
            '_',
            {
              $substr: ['$suffix', 0, -1]
            }
          ]
        },
        userId: 1,
        songId: 1,
        vote: 1,
        timestamps: 1,
        show: 1
      }
    },
    { $sort: { timestamps: -1 } },
    { $limit: limit }
  ]);
});
