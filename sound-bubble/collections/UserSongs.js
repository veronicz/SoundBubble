import SimpleSchema from 'simpl-schema';

UserSongs = new Meteor.Collection('user_songs');
UserSongSchema = new SimpleSchema({
  songId: { type: String },
  userId: { type: String },
  timestamp: { type: Array, optional: true },
  'timestamp.$': { type: Date },
  vote: {
    type: SimpleSchema.Integer,
    allowedValues: [-1, 0, 1],
    optional: true
  },
  show: { type: Boolean, optional: true }
});

UserSongs.attachSchema(UserSongSchema);
UserSongs._ensureIndex({ songId: 1, userId: 1 }, { unique: true });
export default UserSongs;
