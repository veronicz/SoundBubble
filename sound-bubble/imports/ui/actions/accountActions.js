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

export const hideMySong = (song,user,option) => {
  return (dispatch, getState) => {
    Meteor.call('hideMySong', song, user, option, (err, songLogs) => {
      if(err){
        console.log('Hide my song failed', err)
      }else{
        console.log(songLogs);
        dispatch(fetchMySongLogsSuccess(songLogs));
      }
    })
  }
}
