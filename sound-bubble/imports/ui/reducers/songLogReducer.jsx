const songLogReducer = (tracks = [], action) => {
  switch (action.type) {
    case 'FETCH':
      return sortAndUnique(action.songLogs.concat(tracks));

    case 'UPVote':
      return tracks.map((item, index) => {
        if (index == action.payload) {
          return {
            ...item,
            upAmount: item.upAmount + 1,
            voteState: 1
          };
        }
        return item;
      });

    case 'DOWNVote':
      return tracks.map((item, index) => {
        if (index == action.payload) {
          return {
            ...item,
            downAmount: item.downAmount + 1,
            voteState: 2
          };
        }
        return item;
      });

    case 'UPComplete':
      return tracks.map((item, index) => {
        if (index == action.payload) {
          return {
            ...item,
            upAmount: item.upAmount - 1,
            voteState: 0
          };
        }
        return item;
      });

    case 'DOWNComplete':
      return tracks.map((item, index) => {
        if (index == action.payload) {
          return {
            ...item,
            downAmount: item.downAmount - 1,
            voteState: 0
          };
        }
        return item;
      });
  }
  return tracks;
};

function sortAndUnique(songs) {
  unique_songs = uniqueBySongAndTimestamp(songs);
  return unique_songs.sort((a, b) => b.timestamps - a.timestamps);
}

function uniqueBySongAndTimestamp(songs) {
  return songs.filter(
    (song, index, self) =>
      self.findIndex(
        s =>
          s.songId === song.songId &&
          s.timestamps.toISOString() === song.timestamps.toISOString()
      ) === index
  );
}

export default songLogReducer;
