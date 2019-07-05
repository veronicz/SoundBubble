import Groups from '../../api/groups';

export const fetchGroupSongLogs = () => {
  return (dispatch, getState) => {
    Meteor.call('getGroupRecentlyPlayed', '1', function(err, songLogs) {
      if (err) {
        console.log('get group recently played failed', err);
      } else {
        console.log(songLogs);
        dispatch(fetchGroupSongLogsSuccess(songLogs));
      }
    });
  };
};

const fetchGroupSongLogsSuccess = songLogs => {
  return {
    type: 'FETCH',
    songLogs: songLogs
  };
};

export const changeCurrentGroup = groupId => {
  return {
    type: 'USERS_IN_GROUP',
    users: Groups.findOne({ _id: groupId }).userIds
  };
};
