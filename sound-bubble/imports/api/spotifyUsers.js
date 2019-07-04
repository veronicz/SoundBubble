import SimpleSchema from 'simpl-schema';

SpotifyUsers = new Mongo.Collection('spotify_users');
SpotifyUserSchema = new SimpleSchema({
  _id: { type: String },
  name: { type: String },
  profilePic: { type: String, optional: true },
  apiToken: { type: String, optional: true },
  apiRefreshToken: { type: String, optional: true },
  groupIds: { type: Array, optional: true },
  'groupIds.$': { type: String }
});

SpotifyUsers.attachSchema(SpotifyUserSchema);
export default SpotifyUsers;
