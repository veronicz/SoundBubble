Meteor.publish('myGroupIds', function() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: { groupIds: 1 }
      }
    );
  } else {
    this.ready();
  }
});
