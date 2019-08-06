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

const filterKeyReducer = (filterKey = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.value;
    case 'CHANGE_GROUP':
      return '';
    case 'REMOVE_GROUP':
      return '';
  }
  return filterKey;
}
export default combineReducers({
  currentGroupId: currentGroupReducer,
  filterKey: filterKeyReducer
});
