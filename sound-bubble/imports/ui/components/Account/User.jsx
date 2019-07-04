import React, { Component } from 'react';

export default class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="user-container">
        <div className="user-left">
          <img width="150" src={user.profilePic} />
          <br />
        </div>
        <div className="user-right">
          <h3>{user.name}</h3>
          <div className="user-info">
            {formatUserInfo('Followers', user.followerCount)}
            {formatUserInfo('Groups', 0)}
          </div>
          <a href={user.spotifyUrl}>Go To Your Spotify</a>
          <br />
          <a href="https://www.spotify.com/account/apps/?_ga=2.100345246.1881641136.1561931040-1289360233.1558571744">
            Manage Spotify App Access
          </a>
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
