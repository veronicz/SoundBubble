var scopes = [
  'user-library-read',
  'user-follow-read',
  'playlist-read-private',
  'user-read-recently-played'
];
Accounts.ui.config({ requestPermissions: { spotify: scopes } });
