import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

GroupSongs = new Mongo.Collection('group_songs');
GroupSongSchema = new SimpleSchema({
  songId: { type: String },
  groupId: { type: String },
  upvote: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
  downvote: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 }
});

GroupSongs.attachSchema(GroupSongSchema);
if (Meteor.isServer) {
  GroupSongs._ensureIndex({ songId: 1, groupId: 1 }, { unique: true });
}
export default GroupSongs;
