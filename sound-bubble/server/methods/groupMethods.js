import '../spotify-api';
import Groups from '../../imports/api/groups';
import GroupSongs from '../../imports/api/groupSongs';

Meteor.methods({
  createGroup: function(groupName, creatorId) {
    return createGroup(groupName, creatorId);
  },
  deleteGroup: function(groupId){
    return deleteGroup(groupId);
  },
  leaveGroup: function(groupId, userId){
      return leaveGroup(groupId, userId);
  }
});

function createGroup(args){
    // creates a group and adds the creator to the group
    creatorId = Meteor.user().profile.id;
    let groupId = Groups.insert({
        name: args[0].toString(),
        userIds: [args[1]]
    });
    Meteor.users.update({_id: Meteor.userId()}, {$push: {groupIds: groupId}});
}

function deleteGroup(groupId) {
    // deletes the group and deletes all occurences of that group in the users collection
    Groups.remove({ _id: groupId });
    console.log(groupId);
    let userIdsInGroup = Meteor.users.find({groupIds:groupId}).map(user => user.profile.id);
    console.log(userIdsInGroup);
    userIdsInGroup.map(userId =>{
        Meteor.users.upsert({'profile.id': userId}, {$pull: {groupIds: groupId}});
    });
   GroupSongs.remove({groupId:groupId});
}

function leaveGroup(args){
    Groups.upsert({_id: args[0], name:args[2]}, {$pull: {userIds: args[1]}});
    let group = Groups.findOne({_id:args[0]});
    if (group.userIds.length === 0){
        // deletes the group if the group is empty
        Groups.remove({_id:args[0]});
    }
    GroupSongs.remove({userId: args[1]});
    Meteor.users.upsert({'profile.id': args[1]}, {$pull: {groupIds:args[0]}});
}



