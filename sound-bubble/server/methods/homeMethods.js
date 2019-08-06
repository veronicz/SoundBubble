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
  },
  commentSong: function(songId, groupId, comment) {
    postCommentToGroupSong(songId, groupId, comment);
  },
  editComment(songId, groupId, commentId, newComment) {
    updateComment(songId, groupId, commentId, newComment);
  },
  deleteComment(songId, groupId, commentId) {
    removeComment(songId, groupId, commentId);
  }
});

function updateGroupRecentlyPlayed(groupId) {
  let userIds = groupId
    ? Groups.findOne({ _id: groupId }).userIds
    : Meteor.users.find().map(u => u.profile.id);
  userIds.forEach(userId => getAllRecentlyPlayed(userId));
}

function updateGroupVote(songId, groupId, option) {
  switch (option) {
    case 'upvote':
      incGroupVote(songId, groupId, 'upvote', 1);
      break;
    case 'undoUpvote':
      incGroupVote(songId, groupId, 'upvote', -1);
      break;
    case 'downvote':
      incGroupVote(songId, groupId, 'downvote', 1);
      break;
    case 'undoDownvote':
      incGroupVote(songId, groupId, 'downvote', -1);
      break;
  }
}

function updateUserVote(songId, option) {
  switch (option) {
    case 'upvote':
      updateUserSongs(songId, 1);
      break;
    case 'undoUpvote':
      updateUserSongs(songId, 0);
      break;
    case 'downvote':
      updateUserSongs(songId, -1);
      break;
    case 'undoDownvote':
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

function postCommentToGroupSong(songId, groupId, comment) {
  GroupSongs.upsert(
    {
      songId: songId,
      groupId: groupId
    },
    {
      $push: {
        comments: {
          _id: Random.id(),
          userId: Meteor.user().profile.id,
          message: comment
        }
      }
    }
  );
}

function updateComment(songId, groupId, commentId, newComment) {
  GroupSongs.update(
    {
      songId: songId,
      groupId: groupId,
      'comments._id': commentId
    },
    {
      $set: {
        'comments.$.message': newComment
      }
    }
  );
}

function removeComment(songId, groupId, commentId) {
  GroupSongs.update(
    {
      songId: songId,
      groupId: groupId
    },
    {
      $pull: {
        comments: { _id: commentId }
      }
    }
  );
}
