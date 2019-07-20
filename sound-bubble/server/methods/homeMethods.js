import '../spotify-api';
import { getAllRecentlyPlayed } from './commonMethods';
import Groups from '../../imports/api/groups';
import GroupSongs from '../../imports/api/groupSongs';
import UserSongs from '../../imports/api/userSongs';

Meteor.methods({
  getGroupRecentlyPlayed: function(groupId = null) {
    updateGroupRecentlyPlayed(groupId);
  },
  voteGroupSong: function(songId, groupId, option) {
    updateGroupVote(songId, groupId, option);
    updateUserVote(songId, option);
  },
  voteUserSong(songId, option) {
    updateUserVote(songId, option);
  }
});

function updateGroupRecentlyPlayed(groupId) {
  let userIds = groupId
    ? Groups.findOne({ _id: groupId }).userIds
    : Meteor.users.find().map(u => u.profile.id);
  userIds.forEach(userId => getAllRecentlyPlayed(userId));
}

//TODO: what are these option numbers?
function updateGroupVote(songId, groupId, option) {
  switch (option) {
    case 1:
      incGroupVote(songId, groupId, 'upvote', 1);
      break;
    case 2:
      incGroupVote(songId, groupId, 'upvote', -1);
      break;
    case 3:
      incGroupVote(songId, groupId, 'downvote', 1);
      break;
    case 4:
      incGroupVote(songId, groupId, 'downvote', -1);
      break;
  }
}

function updateUserVote(songId, option) {
  switch (option) {
    case 1:
      updateUserSongs(songId, 1);
      break;
    case 2:
      updateUserSongs(songId, 0);
      break;
    case 3:
      updateUserSongs(songId, -1);
      break;
    case 4:
      updateUserSongs(songId, 0);
      break;
  }
}

function updateUserSongs(songId, vote) {
  UserSongs.upsert(
    {
      songId: songId,
      userId: Meteor.user().profile.id
    },
    {
      $set: {
        vote: vote
      }
    }
  );
}

function incGroupVote(songId, groupId, field, value) {
  let fieldValue = {};
  fieldValue[field] = value;
  GroupSongs.upsert(
    {
      songId: songId,
      groupId: groupId
    },
    {
      $inc: fieldValue
    }
  );
}
