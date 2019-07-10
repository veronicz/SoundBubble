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
  // deletes the group and deletes all occurences of that group in the users collection, also remove from groupSongs
  Groups.remove({ _id: groupId });
  console.log(groupId);
  let userIdsInGroup = Meteor.users
    .find({ groupIds: groupId })
    .map(user => user.profile.id);
  console.log(userIdsInGroup);
  userIdsInGroup.forEach(userId => {
    Meteor.users.update(
      { 'profile.id': userId },
      { $pull: { groupIds: groupId } }
    );
  });
  GroupSongs.remove({ groupId: groupId });
}

function leaveGroup(groupId) {
  let currentUserId = Meteor.user().profile.id;
  Groups.update({ _id: groupId }, { $pull: { userIds: currentUserId } });
  let group = Groups.findOne({ _id: groupId });
  if (group.userIds.length === 0) {
    // deletes the group if the group is empty
    deleteGroup(groupId);
  }
  Meteor.users.update(
    { 'profile.id': currentUserId },
    { $pull: { groupIds: groupId } }
  );
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
