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
