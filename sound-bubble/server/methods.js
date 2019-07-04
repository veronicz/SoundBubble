import './spotify-api';
import Songs from '../imports/api/songs';
import UserSongs from '../imports/api/userSongs';
import SpotifyUsers from '../imports/api/spotifyUsers';

Meteor.methods({
  //gets the Current User's Recently Played Tracks
  //TODO: should fetch all user's recently played tracks inside a group
  getRecentlyPlayed: function(user) {
    var response = getFromSpotifyWithOptionsChecked(
      'getMyRecentlyPlayedTracks'
    );
    var songs = response.data.body.items;
    updateUserSongs(songs, user);
    return songs;
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

function updateUserSongs(songs, user) {
  updateSongs(songs);
  songs.forEach(song => {
    UserSongs.upsert(
      {
        userId: user.id,
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
