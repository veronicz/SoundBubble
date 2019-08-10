import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

UserSongs = new Mongo.Collection('user_songs');
UserSongSchema = new SimpleSchema({
  songId: String,
  userId: String,
  timestamps: { type: Array, optional: true },
  'timestamps.$': Date,
  vote: {
    type: SimpleSchema.Integer,
    allowedValues: [-1, 0, 1],
    optional: true,
    defaultValue: 0
  },
  show: { type: Boolean, optional: true, defaultValue: true }
});

UserSongs.attachSchema(UserSongSchema);
if (Meteor.isServer) {
  UserSongs._ensureIndex({ songId: 1, userId: 1 }, { unique: true });
}
export default UserSongs;
