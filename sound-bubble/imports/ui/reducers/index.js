import { combineReducers } from 'redux';
import SongLogReducer from './SongLogReducer';
import UserProfileReducer from './UserProfileReducer';
import CurrentUserReducer from './CurrentUserReducer';

export default combineReducers({
  tracks: SongLogReducer,
  profiles: UserProfileReducer,
  user: CurrentUserReducer
});
