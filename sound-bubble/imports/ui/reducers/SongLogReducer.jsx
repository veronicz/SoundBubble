import { songSampleDataRaw } from './SampleData';

const songLogReducer = (tracks = songSampleDataRaw.items, action) => {
  return tracks;
};

export default songLogReducer;
