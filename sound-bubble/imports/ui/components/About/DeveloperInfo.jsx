import React, { Component } from 'react';

export default class DeveloperInfo extends Component {
  render() {
    const { name, title, zepeto, github } = this.props;
    let zepetoPath = `/About/${zepeto || 'developer'}.png`;
    return (
      <div className="developer-card">
        <div className="container">
          <img src={zepetoPath} alt="developer zepeto" className="dev-zepeto" />
          {formatNameAndTitle(name, title)}
          {formatGithub(github)}
        </div>
      </div>
    );
  }
}

function formatNameAndTitle(name, title) {
  return (
    <div className="dev-name-title">
      <h3>
        <b>{name}</b>
      </h3>
      {title}
    </div>
  );
}

function formatGithub(link) {
  return (
    <div>
      <img src={'/About/github.png'} alt="github logo" id="github" />
      :&nbsp;
      <a href={link}>{link}</a>
    </div>
  );
}
