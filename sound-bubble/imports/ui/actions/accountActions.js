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

export const hideMySong = (songId,option) => {
  return (dispatch, getState) => {
    Meteor.call('hideMySong', songId, option, (err) => {
      if(err){
        console.log('Hide my song failed', err)
      }
    })
  }
}
