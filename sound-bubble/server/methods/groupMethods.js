import '../spotify-api';
import Groups from '../../imports/api/groups';
import GroupSongs from '../../imports/api/groupSongs';

Meteor.methods({
  createGroup: function(groupName) {
    return createGroup(groupName);
  },
  deleteGroup: function(groupId) {
    return deleteGroup(groupId);
  },
  leaveGroup: function(groupId) {
    return leaveGroup(groupId);
  },
  addGroupMember: function(groupId, userId) {
    addGroupMember(groupId,userId)
  }
});

function createGroup(groupName) {
  // creates a group and adds the creator to the group
  let groupId = Groups.insert({
    name: groupName,
    userIds: [Meteor.user().profile.id]
  });
  Meteor.users.update(
    { _id: Meteor.userId() },
    { $push: { groupIds: groupId } }
  );
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

function leaveGroup(groupId) {
  let currentUserId = Meteor.user().profile.id;
  Groups.update({ _id: groupId }, { $pull: { userIds: currentUserId } });
  Meteor.users.update(
    { 'profile.id': currentUserId },
    { $pull: { groupIds: groupId } }
  );

  let group = Groups.findOne({ _id: groupId });
  if (group.userIds.length === 0) {
    // deletes the group if the group is empty
    deleteGroup(groupId);
  } else {
    let userVotedSongs = UserSongs.find({
      userId: currentUserId,
      vote: { $ne: 0 }
    });
    // remove user vote from group vote
    userVotedSongs.forEach(song => {
      let fieldToDecrement = song.vote === 1 ? { upvote: 1 } : { downvote: 1 };
      GroupSongs.update(
        { songId: song._id, groupId: groupId },
        {
          $dec: fieldToDecrement
        }
      );
    });
  }
}

function addGroupMember(groupId, userId) {
  Groups.update(
    {_id: groupId},
    {$push: { userIds: userId}}
  );
  Meteor.users.update(
    {'profile.id': userId},
    {$push: {groupIds: groupId}}
  );
  //add the user vote to the group vote count
  let userVotedSongs = UserSongs.find(
    {userId: userId,
    vote: {$ne: 0}}
  );
  userVotedSongs.forEach(song => {
    let fieldToIncrement = song.vote === 1 ? {upvote: 1} : {downvote: 1};
    GroupSongs.upsert({
      songId: song._id,
      groupId: groupId
    },
    {$inc: fieldToIncrement})
  });
}
