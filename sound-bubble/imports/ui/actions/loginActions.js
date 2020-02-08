export const updateUserProfilePic = () => {
  return (dispatch, getState) => {
    Meteor.call("updateUserProfilePic", err => {
      if (err) {
        console.log(
          "Update profile picture field inside users.profile failed",
          err
        );
      }
    });
  };
};
