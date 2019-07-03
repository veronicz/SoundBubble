import SimpleSchema from 'simpl-schema';

Users = new Meteor.Collection('users');
UserSchema = new SimpleSchema({
  _id: { type: String },
  name: { type: String },
  profilePic: { type: String, optional: true },
  apiToken: { type: String, optional: true },
  apiRefreshToken: { type: String, optional: true },
  groupIds: { type: Array, optional: true },
  'groupIds.$': { type: String }
});

Users.attachSchema(UserSchema);
export default Users;
