import '../spotify-api';
import Groups from '../../imports/api/groups';
import GroupSongs from '../../imports/api/groupSongs';

Meteor.methods({
  createGroup: function(groupName) {
    return createGroup(groupName);
  },
  leaveGroup: function(groupId) {
    return removeGroupMember(groupId, Meteor.user().profile.id);
  },
  addGroupMember: function(groupId, userId) {
    addGroupMember(groupId, userId);
  },
  promoteAdmin: function(groupId, userId) {
    promoteAdmin(groupId, userId);
  },
  removeGroupMember: function(groupId, userId) {
    removeGroupMember(groupId, userId);
  }
});

function createGroup(groupName) {
  // creates a group and adds the creator to the group
  let groupId = Groups.insert({
    name: groupName,
    adminId: Meteor.user().profile.id,
    userIds: [Meteor.user().profile.id]
  });
  Meteor.users.update(
    { _id: Meteor.userId() },
    { $push: { groupIds: groupId } }
  );
}

function promoteAdmin(groupId, userId) {
  Groups.update({ _id: groupId }, { $set: { adminId: userId } });
}

function deleteGroup(groupId) {
  // remove all users from the group, delete the group, also remove from groupSongs
  Groups.findOne({ _id: groupId }).userIds.forEach(userIdInGroup => {
    Meteor.users.update(
      { 'profile.id': userIdInGroup },
      { $pull: { groupIds: groupId } }
    );
  });
  Groups.remove({ _id: groupId });
  GroupSongs.remove({ groupId: groupId });
}

function addGroupMember(groupId, userId) {
  Groups.update({ _id: groupId }, { $push: { userIds: userId } });
  Meteor.users.update(
    { 'profile.id': userId },
    { $push: { groupIds: groupId } }
  );
  //add the user vote to the group vote count
  let userVotedSongs = UserSongs.find({ userId: userId, vote: { $ne: 0 } });
  userVotedSongs.forEach(song => {
    let fieldToIncrement = song.vote === 1 ? { upvote: 1 } : { downvote: 1 };
    GroupSongs.upsert(
      {
        songId: song.songId,
        groupId: groupId
      },
      { $inc: fieldToIncrement }
    );
  });
}

function removeGroupMember(groupId, userId) {
  Groups.update({ _id: groupId }, { $pull: { userIds: userId } });
  Meteor.users.update(
    { 'profile.id': userId },
    { $pull: { groupIds: groupId } }
  );

  let group = Groups.findOne({ _id: groupId });
  if (group.userIds.length === 0) {
    // deletes the group if the group is empty
    deleteGroup(groupId);
  } else {
    let userVotedSongs = UserSongs.find({
      userId: userId,
      vote: { $ne: 0 }
    });
    // remove user vote from group vote
    userVotedSongs.forEach(song => {
      let fieldToDecrement =
        song.vote === 1 ? { upvote: -1 } : { downvote: -1 };
      GroupSongs.update(
        { songId: song.songId, groupId: groupId },
        {
          $inc: fieldToDecrement
        }
      );
    });
  }
}
