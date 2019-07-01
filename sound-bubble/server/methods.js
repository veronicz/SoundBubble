import './spotify-api';

Meteor.methods({
  //gets the Current User's Recently Played Tracks
  //TODO: should fetch all user's recently played tracks inside a group
  getRecentlyPlayed: function() {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getMyRecentlyPlayedTracks({});
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.getMyRecentlyPlayedTracks({});
    }
    return response.data.body.items;
  },
  getMe: function() {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getMe();
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.getMe();
    }
    return response.data.body;
  }
});

var checkTokenRefreshed = function(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
};
