import SimpleSchema from 'simpl-schema';

GroupSongs = new Meteor.Collection('group_songs');
GroupSongSchema = new SimpleSchema({
  songId: { type: String },
  groupId: { type: String },
  upvote: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
  downvote: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 }
});

GroupSongs.attachSchema(GroupSongSchema);
GroupSongs._ensureIndex({ songId: 1, groupId: 1 }, { unique: true });
export default GroupSongs;
