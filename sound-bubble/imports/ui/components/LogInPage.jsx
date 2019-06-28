import React, { Component } from 'react';
import '../stylesheets/LogIn.css';

export default class LogInPage extends Component {
  render() {
    let logIn = this.props.logIn;
    return (
      <div className="welcome_container">
        <h1 className="page_title">SoundBubble</h1>
        <p className="welcome_description">
          SoundBubble integrates users' Spotify music listening history via
          Spotify's public API. To begin using this application and sharing
          music, you must be subscribed to Spotify and enable API access to your
          user account. Terms and conditions are outlined when logging in. To
          begin, log in with Spotify below.
        </p>
        <button className="login" onClick={() => logIn()}>
          Login with Spotify
        </button>
      </div>
    );
  }
}
