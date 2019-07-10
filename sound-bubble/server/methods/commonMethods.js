import '../spotify-api';
import Songs from '../../imports/api/songs';
import UserSongs from '../../imports/api/userSongs';

export function getRecentlyPlayed(userId, config = null) {
  let response = getFromSpotifyWithOptionsChecked(
    'getMyRecentlyPlayedTracks',
    config
  );
  let songs = response.data.body.items;
  updateUserSongs(songs, userId);
  return getRecentlyPlayedSorted(userId);
}

function getFromSpotifyWithOptionsChecked(methodName, config, options = {}) {
  var spotifyApi = new SpotifyWebApi();
  if (config) {
    spotifyApi.setAccessToken(config.accessToken);
    spotifyApi.setRefreshToken(config.refreshToken);
  }
  var response = spotifyApi[methodName](options);
  if (checkTokenRefreshed(response, spotifyApi)) {
    response = spotifyApi[methodName](options);
  }
  return response;
}

function checkTokenRefreshed(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
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
  songs
    .map(s => s.track)
    .forEach(song => {
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

function getRecentlyPlayedSorted(userId, limit = 10) {
  return UserSongs.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$timestamps' },
    { $sort: { timestamps: -1 } },
    { $limit: limit }
  ]);
}