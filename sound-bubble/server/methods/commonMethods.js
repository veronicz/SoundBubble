import '../spotify-api';
import Songs from '../../imports/api/songs';
import UserSongs from '../../imports/api/userSongs';

export function getAllRecentlyPlayed(userId, config = null) {
  do {
    let lastFetchedTime =
      Meteor.users.findOne({ 'profile.id': userId }).lastFetched ||
      '1546300800000'; //fetch from 2019/01/01 12:00am UTC
    let options = { after: lastFetchedTime, limit: 50 };
    let response = getFromSpotifyWithOptionsChecked(
      'getMyRecentlyPlayedTracks',
      options,
      config
    );

    let newSongs = response.items;
    if (newSongs.length === 0) break;
    updateUserLastFetched(response.cursors, userId);
    updateUserSongs(newSongs, userId);
  } while (true);
}

function getFromSpotifyWithOptionsChecked(methodName, options, config) {
  var spotifyApi = config ? new SpotifyWebApi(config) : new SpotifyWebApi();
  var response = spotifyApi[methodName](options);
  if (checkTokenRefreshed(response, spotifyApi)) {
    response = spotifyApi[methodName](options);
  }
  return response.data.body;
}

function checkTokenRefreshed(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
}

function updateUserLastFetched(cursors, userId) {
  let lastPlayedTime = cursors.after;
  Meteor.users.update(
    { 'profile.id': userId },
    { $max: { lastFetched: lastPlayedTime } }
  );
}

function updateUserSongs(songs, userId) {
  updateSongs(songs);
  songs.forEach(song => {
    UserSongs.upsert(
      {
        userId: userId,
        songId: song.track.id
      },
      {
        $addToSet: {
          //ignoring differences < 1 minute
          timestamps: new Date(song.played_at).setSeconds(0, 0)
        }
      }
    );
  });
}

function updateSongs(songs) {
  songs.forEach(s => {
    let song = s.track;
    Songs.upsert(
      { _id: song.id },
      {
        $set: {
          name: song.name,
          artists: song.artists.map(artist => artist.name),
          spotifyUrl: song.external_urls.spotify,
          albumCover: song.album.images[0].url
        }
      }
    );
  });
}
