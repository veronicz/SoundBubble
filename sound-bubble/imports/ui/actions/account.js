export const fetchMySongLogs = () => {
  return (dispatch, getState) => {
    Meteor.call('getRecentlyPlayed', getState().user, function(err, songLogs) {
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

export const getCurrentUser = () => {
  return (dispatch, getState) => {
    Meteor.call('getMe', function(err, currentUser) {
      if (err) {
        console.log('get current user failed', err);
      } else {
        console.log(currentUser);
        dispatch(getCurrentUserSuccess(currentUser));
      }
    });
  };
};

const getCurrentUserSuccess = currentUser => {
  return {
    type: 'ME',
    user: currentUser
  };
};
