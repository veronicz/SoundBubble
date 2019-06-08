import React, { Component } from 'react';
import currentUserRaw from './sampleData/sampleUser.jsx';

export default class User extends Component {
  render() {
    const user = currentUserRaw.currentUserRaw;
    return (
      <div className="user-container">
        <div className="user-left">
          <img width="150" src={user.images[0].url} />
          <br />
        </div>
        <div className="user-right">
          <h3>{user.display_name}</h3>
          <div className="user-info">
            {formatUserInfo('Followers', user.followers.total)}
            {formatUserInfo('Groups', 0)}
            {formatUserInfo('Email', user.email)}
          </div>
          <a href={user.external_urls.spotify}>Go To Your Spotify</a>
          <br />
          <a href={user.href}>Manage Spotify Authorization</a>
        </div>
      </div>
    );
  }
}

function formatUserInfo(title, detail) {
  return (
    <dl className="user-detail">
      <dt>{title}</dt>
      <dd>{detail}</dd>
    </dl>
  );
}
