import { combineReducers } from 'redux';
import SongLogReducer from './songLogReducer';
import CurrentGroupReducer from './currentGroupReducer';

export default combineReducers({
  tracks: SongLogReducer,
  usersInGroup: CurrentGroupReducer
});
