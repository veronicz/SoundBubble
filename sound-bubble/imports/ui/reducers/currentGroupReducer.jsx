const currentGroupReducer = (currentGroup = null, action) => {
  switch (action.type) {
    case 'CHANGE_GROUP':
      return action.group;
  }
  return currentGroup;
};

export default currentGroupReducer;
