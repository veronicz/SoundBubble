const currentGroupReducer = (usersInGroup = [], action) => {
  switch (action.type) {
    case 'USERS_IN_CURRENT_GROUP':
      return action.users;

    default:
      break;
  }
  return usersInGroup;
};

export default currentGroupReducer;
