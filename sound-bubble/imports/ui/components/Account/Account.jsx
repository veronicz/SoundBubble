import React, { Component } from 'react';
import User from './User.jsx';
import UserFeed from './UserFeed.jsx';
import '../../stylesheets/Account.css';
export default class Account extends Component {
  render() {
    
    return <div className="pageContainer"><h1 className="me">My Info</h1><User /><UserFeed/></div>;
  }


}
