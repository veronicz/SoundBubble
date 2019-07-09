import '../spotify-api';
import Groups from '../../imports/api/groups';

Meteor.methods({
  createGroup: function(groupName, creatorId) {
    return createGroup(groupName, creatorId);
  },
  deleteGroup: function(groupId){
    return deleteGroup(groupId);
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
    return "Success: group created";
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
    return "Success: group deleted";
}

