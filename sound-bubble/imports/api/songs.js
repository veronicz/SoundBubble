import SimpleSchema from 'simpl-schema';

Songs = new Mongo.Collection('songs');
SongSchema = new SimpleSchema({
  _id: String,
  name: String,
  artists: Array,
  'artists.$': String,
  spotifyUrl: String,
  albumCover: { type: String, optional: true }
});

Songs.attachSchema(SongSchema);
export default Songs;
