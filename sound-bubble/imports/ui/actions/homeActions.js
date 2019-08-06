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

export const commentSong = (songId, groupId, comment) => {
  return (dispatch, getState) => {
    Meteor.call('commentSong', songId, groupId, comment, err => {
      if (err) {
        console.log('comment song failed', err);
      }
    });
  };
};