import React, { Component } from 'react';
import Developers from './Developers';
import References from './References';
import '../../stylesheets/About.css';

const references = ['https://www.w3schools.com/howto/howto_css_cards.asp'];
export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About SoundBubble</h1>
        <p>This application is a platform for integrating songs played on Spotify and for sharing music with other users. Users are able to view song logs of other users in their groups, and rate particular tracks by "Up Voting" and "Down Voting" other users' individual song logs. Time to expand your bubble!</p> 

        <h1>About Us</h1>
        <Developers />
        <References references={references} />
      </div>
    );
  }
}
