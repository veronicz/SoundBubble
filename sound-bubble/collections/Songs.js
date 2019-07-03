import SimpleSchema from 'simpl-schema';

Songs = new Meteor.Collection('songs');
SongSchema = new SimpleSchema({
  _id: { type: String },
  name: { type: String },
  artist: { type: Array },
  'artist.$': { type: String },
  spotifyUrl: { type: String },
  albumCover: { type: String, optional: true }
});

Songs.attachSchema(SongSchema);
export default Songs;
