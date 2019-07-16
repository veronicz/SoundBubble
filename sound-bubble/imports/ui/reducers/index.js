import { combineReducers } from 'redux';

const currentGroupReducer = (currentGroup = null, action) => {
  switch (action.type) {
    case 'CHANGE_GROUP':
      return action.group;
    case 'REMOVE_GROUP':
      return null;
  }
  return currentGroup;
};

export default combineReducers({
  currentGroup: currentGroupReducer
});
