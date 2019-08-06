import { fetchMySongLogs } from './accountActions';

export const fetchGroupSongLogs = () => {
  return (dispatch, getState) => {
    if (getState().currentGroupId) {
      Meteor.call('getGroupRecentlyPlayed', getState().currentGroupId, err => {
        if (err) {
          console.log('get group recently played failed', err);
        }
      });
    } else {
      //user is not in any group, display own songs
      dispatch(fetchMySongLogs());
    }
  };
};

export const changeCurrentGroup = groupId => {
  return {
    type: 'CHANGE_GROUP',
    groupId: groupId
  };
};

export const changeFilter = (filterKey) => {
  return {
    type: 'CHANGE_FILTER',
    value: filterKey
  }
}


export const vote = (songId, option) => {
  return (dispatch, getState) => {
    if (getState().currentGroupId) {
      Meteor.call(
        'voteGroupSong',
        songId,
        getState().currentGroupId,
        option,
        err => {
          if (err) {
            console.log(
              `vote song with ${songId} in group ${
                getState().currentGroupId
              } failed`,
              err
            );
          }
        }
      );
    } else {
      Meteor.call('voteUserSong', songId, option, err => {
        if (err) {
          console.log(`vote song with ${songId} failed`, err);
        }
      });
    }
  };
};

export const commentSong = (songId, comment) => {
  return (dispatch, getState) => {
    Meteor.call(
      'commentSong',
      songId,
      getState().currentGroupId,
      comment,
      err => {
        if (err) {
          console.log('comment song failed', err);
        }
      }
    );
  };
};

export const editComment = (songId, commentId, newComment) => {
  return (dispatch, getState) => {
    Meteor.call(
      'editComment',
      songId,
      getState().currentGroupId,
      commentId,
      newComment,
      err => {
        if (err) {
          console.log('edit comment failed', err);
        }
      }
    );
  };
};

export const deleteComment = (songId, commentId) => {
  return (dispatch, getState) => {
    Meteor.call(
      'deleteComment',
      songId,
      getState().currentGroupId,
      commentId,
      err => {
        if (err) {
          console.log('delete comment failed', err);
        }
      }
    );
  };
};