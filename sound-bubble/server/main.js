import { Meteor } from 'meteor/meteor';
import SpotifyOAuthInit from '../imports/api/oauth-spotify';
import './methods';

Meteor.startup(() => {
  SpotifyOAuthInit();
});
