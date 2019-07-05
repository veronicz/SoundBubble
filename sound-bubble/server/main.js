import { Meteor } from 'meteor/meteor';
import SpotifyOAuthInit from '../imports/api/oauth-spotify';
import './methods/homeMethods';
import './methods/accountMethods';

Meteor.startup(() => {
  SpotifyOAuthInit();
});
