import { combineReducers } from 'redux';

const currentGroupReducer = (currentGroupId = null, action) => {
  switch (action.type) {
    case 'CHANGE_GROUP':
      return action.groupId;
    case 'REMOVE_GROUP':
      return null;
  }
  return currentGroupId;
};

export default combineReducers({
  currentGroupId: currentGroupReducer
});
