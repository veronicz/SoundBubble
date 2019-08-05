import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

GroupSongs = new Mongo.Collection('group_songs');
GroupSongSchema = new SimpleSchema({
  songId: String,
  groupId: String,
  upvote: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
  downvote: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
  comments: { type: Array, optional: true },
  'comments.$': Object,
  'comments.$._id': { type: String, regEx: SimpleSchema.RegEx.Id },
  'comments.$.userId': String,
  'comments.$.message': { type: String, max: 200 },
  'comments.$.date': {
    type: Date,
    autoValue: function() {
      console.log('hi');
      if (this.operator !== '$pull') {
        return new Date();
      }
    }
  }
});

GroupSongs.attachSchema(GroupSongSchema);
if (Meteor.isServer) {
  GroupSongs._ensureIndex({ songId: 1, groupId: 1 }, { unique: true });
}
export default GroupSongs;
