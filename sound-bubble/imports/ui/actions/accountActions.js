export const fetchMySongLogs = () => {
  return (dispatch, getState) => {
    Meteor.call('getMyRecentlyPlayed', err => {
      if (err) {
        console.log('get my recently played failed', err);
      }
    });
  };
};

export const hideMySong = (songId, option) => {
  return (dispatch, getState) => {
    Meteor.call('hideMySong', songId, option, err => {
      if (err) {
        console.log('Hide my song failed', err);
      }
    });
  };
};
