import '../spotify-api';
import { getRecentlyPlayed } from './commonMethods';
import Groups from '../../imports/api/groups';
import GroupSongs from '../../imports/api/groupSongs';
import UserSongs from '../../imports/api/userSongs';

Meteor.methods({
  getGroupRecentlyPlayed: function(group) {
    return updateGroupRecentlyPlayed(group);
  },
  vote: function(songId,userId,groupId, option) {
    voteSong(songId,userId,groupId,option)
    return updateGroupRecentlyPlayed(groupId);
  }
});

function updateGroupRecentlyPlayed(groupId) {
  let userIds = Groups.findOne({ _id: groupId }).userIds;
  let tracks = [];
  userIds.forEach(userId => {
    let tokens = {};
    try {
      tokens = getTokensForUser(userId);
    } catch (error) {
      throw new Meteor.Error(error);
    }
    tracks = tracks.concat(getRecentlyPlayed(userId, tokens));
    getGroupVote(tracks, groupId);
  });
  return tracks;
}

function getTokensForUser(userId) {
  let user = Meteor.users.findOne({ 'profile.id': userId });
  if (!user) {
    throw `User with id: ${userId} is not in the database`;
  }
  return {
    accessToken: user.services.spotify.accessToken,
    refreshToken: user.services.spotify.refreshToken
  };
}

function getGroupVote(tracks, groupId) {
  tracks.forEach(track => {
    GroupSongs.upsert({
      songId: track.songId,
      groupId: groupId
    },{
      $set: {songId: track.songId,
             groupId: groupId}
    })
  })
}

function voteSong(songId,userId,groupId,option){
  if(option === 1){
    GroupSongs.update({
      songId:songId,
      groupId: groupId
    },{
      $inc: {
        upvote: 1
      }
    });
    UserSongs.update({
      songId:songId,
      userId:userId
    },{
      $set: {
        vote: 1
      }
    })
  }
  if(option === 2){
    GroupSongs.update({
      songId:songId,
      groupId:groupId
    },{
      $inc: {
        upvote: -1
      }
    });
    UserSongs.update({
      songId:songId,
      userId:userId
    },{
      $set: {
        vote: 0
      }
    })
  }
  if(option === 3){
    GroupSongs.update({
      songId:songId,
      groupId:groupId
    },{
      $inc: {
        downvote: 1
      }
    });
    UserSongs.update({
      songId:songId,
      userId:userId
    },{
      $set: {
        vote: -1
      }
    })
  }
  if(option === 4){
    GroupSongs.update({
      songId:songId,
      groupId:groupId
    },{
      $inc: {
        downvote: -1
      }
    });
    UserSongs.update({
      songId:songId,
      userId:userId
    },{
      $set: {
        vote: 0
      }
    })
  }
}

