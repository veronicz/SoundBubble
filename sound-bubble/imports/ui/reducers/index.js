import { combineReducers } from 'redux';

const currentGroupReducer = (currentGroup = null, action) => {
  switch (action.type) {
    case 'CHANGE_GROUP':
      return action.group;
    case 'REMOVE_GROUP':
      if(currentGroup._id === action.group){
        return null;
      }
  }
  return currentGroup;
};

export default combineReducers({
  currentGroup: currentGroupReducer
});
