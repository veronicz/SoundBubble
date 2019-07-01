export const fetchSongLogs = () => {
  return (dispatch, getState) => {
    Meteor.call('getRecentlyPlayed', function(err, songLogs) {
      if (err) {
        console.log('get recently played failed', err);
      } else {
        dispatch(fetchSongLogsSuccess(songLogs));
      }
    });
  };
};

const fetchSongLogsSuccess = songLogs => {
  return {
    type: 'FETCH',
    songLogs: songLogs
  };
};
