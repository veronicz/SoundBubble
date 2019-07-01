export const fetchMySongLogs = () => {
  return (dispatch, getState) => {
    Meteor.call('getRecentlyPlayed', function(err, songLogs) {
      if (err) {
        console.log('get recently played failed', err);
      } else {
        dispatch(fetchMySongLogsSuccess(songLogs));
      }
    });
  };
};

const fetchMySongLogsSuccess = songLogs => {
  return {
    type: 'FETCH_MINE',
    songLogs: songLogs
  };
};
