import { combineReducers } from 'redux';
import SongLogReducer from './SongLogReducer';
import UserProfileReducer from './UserProfileReducer';

export default combineReducers({
  tracks: SongLogReducer,
  profiles: UserProfileReducer
});
