import React, { Component } from 'react';
import DeveloperInfo from './DeveloperInfo';

export default class Developers extends Component {
  render() {
    return (
      <div className="developers">
        <DeveloperInfo
          name="Martin Palanca"
          title="Full Stack Developer"
          zepeto="martin"
          github="https://github.com/martipal"
        />
        <DeveloperInfo
          name="Sherry Zhang"
          title="Full Stack Developer"
          zepeto="sherry"
          github="https://github.com/veronicz"
        />
        <DeveloperInfo
          name="Yancey Yang"
          title="Full Stack Developer"
          zepeto="yancey"
          github="https://github.com/Talos6"
        />
      </div>
    );
  }
}
