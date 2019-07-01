export const getCurrentUser = () => {
  return (dispatch, getState) => {
    Meteor.call('getMe', function(err, currentUser) {
      if (err) {
        console.log('get current user failed', err);
      } else {
        console.log(currentUser);
        dispatch(getCurrentUserSuccess(currentUser));
      }
    });
  };
};

const getCurrentUserSuccess = currentUser => {
  return {
    type: 'ME',
    user: currentUser
  };
};
