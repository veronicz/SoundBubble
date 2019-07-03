import React, { Component } from 'react';
import User from './User.jsx';
import UserFeed from './UserFeed.jsx';
import '../../stylesheets/Account.css';
import { connect } from 'react-redux';

class Account extends Component {
  //maybe a loading screen if user is null
  render() {
    const { user } = this.props;
    if (user) {
      return (
        <div className="pageContainer">
          <h1 className="me">My Info</h1>
          <User user={user} />
          <UserFeed user={user} />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Account);
