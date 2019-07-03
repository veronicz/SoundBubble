import SimpleSchema from 'simpl-schema';

Songs = new Mongo.Collection('songs');
SongSchema = new SimpleSchema({
  _id: { type: String },
  name: { type: String },
  artists: { type: Array },
  'artists.$': { type: String },
  spotifyUrl: { type: String },
  albumCover: { type: String, optional: true }
});

Songs.attachSchema(SongSchema);
export default Songs;
