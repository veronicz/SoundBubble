export const fetchGroupSongLogs = () => {
  return (dispatch, getState) => {
    Meteor.call('getRecentlyPlayed', getState().user, function(err, songLogs) {
      if (err) {
        console.log('get recently played failed', err);
      } else {
        dispatch(fetchGroupSongLogsSuccess(songLogs));
      }
    });
  };
};

const fetchGroupSongLogsSuccess = songLogs => {
  return {
    type: 'FETCH_MINE',
    songLogs: songLogs
  };
};
