const currentUserReducer = (user = null, action) => {
  switch (action.type) {
    case 'ME':
      return action.user;
  }
  return user;
};

export default currentUserReducer;
