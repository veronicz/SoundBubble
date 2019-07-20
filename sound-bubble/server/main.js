import { Meteor } from 'meteor/meteor';
import SpotifyOAuthInit from '../imports/api/oauth-spotify';
import './methods/homeMethods';
import './methods/accountMethods';
import './methods/groupMethods';
import './publication';

Meteor.startup(() => {
  SpotifyOAuthInit();
});
