import './spotify-api';
import Songs from '../imports/api/songs';
import UserSongs from '../imports/api/userSongs';
import SpotifyUsers from '../imports/api/spotifyUsers';

Meteor.methods({
  //gets the Current User's Recently Played Tracks
  //TODO: should fetch all user's recently played tracks inside a group
  getRecentlyPlayed: function() {
    var response = getFromSpotifyWithOptionsChecked(
      'getMyRecentlyPlayedTracks'
    );
    var songs = response.data.body.items;
    updateUserSongs(songs);
    return songs;
  },
  getMe: function() {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getMe();
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.getMe();
    }
    var user = response.data.body;
    updateUser(user, spotifyApi);
    return user;
  }
});

function getFromSpotifyWithOptionsChecked(callback) {
  var spotifyApi = new SpotifyWebApi();
  var response = spotifyApi[callback]({});
  if (checkTokenRefreshed(response, spotifyApi)) {
    response = spotifyApi[callback]({});
  }
  return response;
}

var checkTokenRefreshed = function(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
};

function updateUserSongs(songs) {
  updateSongs(songs);
  songs.forEach(song => {
    UserSongs.upsert(
      {
        userId: '31ww2xhlilkmjxpnqnar4afvtdze',
        songId: song.track.id
      },
      {
        $addToSet: {
          //ignoring differences < 1 minute
          timestamps: new Date(song.played_at.substring(0, 16))
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

function updateUser(user, api) {
  SpotifyUsers.upsert(
    {
      _id: user.id
    },
    {
      $set: {
        name: user.display_name,
        profilePic: user.images[0].url,
        apiToken: api.acessToken,
        apiRefreshToken: api.refreshToken
      }
    }
  );
}
