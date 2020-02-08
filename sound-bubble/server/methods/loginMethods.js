Meteor.methods({
  updateUserProfilePic: function() {
    updateUserProfilePic(Meteor.user().profile.id);
  }
});

function updateUserProfilePic() {
  Meteor.users.update(
    { _id: Meteor.userId() },
    {
      $set: {
        "profile.images": Meteor.user().services.spotify.images
      }
    }
  );
}
