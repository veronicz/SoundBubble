import Groups from '../../api/groups';
import { fetchMySongLogs } from './accountActions';

export const fetchGroupSongLogs = () => {
  return (dispatch, getState) => {
    if (getState().currentGroup) {
      Meteor.call(
        'getGroupRecentlyPlayed',
        getState().currentGroup._id,
        function(err, songLogs) {
          if (err) {
            console.log('get group recently played failed', err);
          } else {
            console.log(songLogs);
            dispatch(fetchGroupSongLogsSuccess(songLogs));
          }
        }
      );
    } else {
      //user is not in any group, display own songs
      dispatch(fetchMySongLogs());
    }
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
    type: 'CHANGE_GROUP',
    group: Groups.findOne({ _id: groupId })
  };
};

export const vote = (songId, userId, Option) => {
  return (dispatch, getState) => {
    Meteor.call('vote', songId, userId, getState().currentGroup._id, Option, (err, songLogs) => {
      if(err){
        console.log('vote failed', err);
      }else{
        console.log(songLogs)
        dispatch(fetchGroupSongLogsSuccess(songLogs))
      }
    })
  }
}