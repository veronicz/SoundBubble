import { songSampleDataRaw } from './SampleData';

var currentIdx = 1;

const songLogReducer = (tracks = [songSampleDataRaw.items[0]], action) => {
  switch (action.type) {
    case 'FETCH':
      if (currentIdx < songSampleDataRaw.items.length) {
        return [songSampleDataRaw.items[currentIdx++], ...tracks];
      } else {
        return tracks;
      }
  }
  return tracks;
};

export default songLogReducer;
