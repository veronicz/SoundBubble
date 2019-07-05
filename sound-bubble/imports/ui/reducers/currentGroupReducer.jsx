const currentGroupReducer = (usersInGroup = [], action) => {
  switch (action.type) {
    case 'USERS_IN_GROUP':
      return action.users;
  }
  return usersInGroup;
};

export default currentGroupReducer;
