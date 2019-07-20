import React, { Component } from 'react';
import '../stylesheets/LogIn.css';

export default class LogInPage extends Component {
  logIn() {
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: [
        'user-library-read',
        'user-follow-read',
        'playlist-read-private',
        'user-read-recently-played'
      ] // Spotify access scopes.
    };

    Meteor.loginWithSpotify(options, err => {
      if (err) {
        console.log('login failed', err);
      }
    });
  }

  render() {
    return (
      <div className="welcome_container">
        <h1 className="page_title">SoundBubble</h1>
        <p className="welcome_description">
          SoundBubble is an application which integrates users' Spotify music
          listening history via Spotify's public API. To begin using this
          application and sharing music, you must be subscribed to Spotify and
          enable API access to your user account. Terms and conditions are
          outlined when logging in. To begin, log in with Spotify below.
        </p>
        <button className="login" onClick={() => this.logIn()}>
          Login with Spotify
        </button>
      </div>
    );
  }
}
