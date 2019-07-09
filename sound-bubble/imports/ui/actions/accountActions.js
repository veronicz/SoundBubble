export const fetchMySongLogs = () => {
  return (dispatch, getState) => {
    Meteor.call('getMyRecentlyPlayed', (err, songLogs) => {
      if (err) {
        console.log('get my recently played failed', err);
      } else {
        console.log(songLogs);
        dispatch(fetchMySongLogsSuccess(songLogs));
      }
    });
  };
};

const fetchMySongLogsSuccess = songLogs => {
  return {
    type: 'FETCH',
    songLogs: songLogs
  };
};



