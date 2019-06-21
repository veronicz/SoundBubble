import React, { Component } from 'react';
import Developers from './Developers';
import References from './References';
import '../../stylesheets/About.css';

const references = ['https://www.w3schools.com/howto/howto_css_cards.asp'];
export default class About extends Component {
  render() {
    return (
      <div>
        <h1>About Us</h1>
        <Developers />
        <References references={references} />
      </div>
    );
  }
}
