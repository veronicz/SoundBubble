import Groups from '../../api/groups';
import { fetchMySongLogs } from './accountActions';

export const fetchGroupSongLogs = () => {
  return (dispatch, getState) => {
    if (getState().currentGroup) {
      Meteor.call(
        'getGroupRecentlyPlayed',
        getState().currentGroup._id,
        function(err) {
          if (err) {
            console.log('get group recently played failed', err);
          }
        }
      );
    } else {
      //user is not in any group, display own songs
      dispatch(fetchMySongLogs());
    }
  };
};

export const changeCurrentGroup = groupId => {
  return {
    type: 'CHANGE_GROUP',
    group: Groups.findOne({ _id: groupId })
  };
};

export const vote = (songId, option) => {
  return (dispatch, getState) => {
    if (getState().currentGroup) {
      Meteor.call(
        'voteGroupSong',
        songId,
        getState().currentGroup._id,
        option,
        err => {
          if (err) {
            console.log(
              `vote song with ${songId} in group ${
                getState().currentGroup._id
              } failed`,
              err
            );
          }
        }
      );
    } else {
      Meteor.call('voteUserSong', songId, option, err => {
        if (err) {
          console.log(`vote song with ${songId} failed`, err);
        }
      });
    }
  };
};
