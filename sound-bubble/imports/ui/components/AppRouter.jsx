import React, { Component } from 'react';
import Home from '../components/Home/Home.jsx';
import Account from '../components/Account/Account.jsx';
import About from '../components/About/About.jsx';
import Groups from '../components/Groups/Groups.jsx';
import LogInPage from '../components/LogInPage.jsx';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import '../stylesheets/Heading.css';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class AppRouter extends Component {
  constructor() {
    super();
    this.state = { loggedIn: false };
  }

  logIn() {
    this.setState({ loggedIn: true });
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: [
        'user-library-read',
        'user-follow-read',
        'playlist-read-private',
        'user-read-recently-played'
      ] // Spotify access scopes.
    };

    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || 'No error');
    });
  }

  render() {
    if (this.state.loggedIn === true) {
      return (
        <BrowserRouter>
          <div>
            <div className="headerContainer">
              <div className="page_title_container">
                <h1 className="header_page_title">SoundBubble</h1>
              </div>
              <AccountsUIWrapper />
              <div className="navContainer">
                <NavLink
                  exact
                  to={'/'}
                  className="navLink"
                  activeClassName="activeLink"
                >
                  <span
                    className="glyphicon glyphicon-home"
                    area-hidden="true"
                  />
                  Home
                </NavLink>
                <NavLink
                  to={'/Account'}
                  className="navLink"
                  activeClassName="activeLink"
                >
                  My Profile
                </NavLink>
                <NavLink
                  to={'/Groups'}
                  className="navLink"
                  activeClassName="activeLink"
                >
                  My Groups
                </NavLink>
                <NavLink
                  to={'/About'}
                  id="rest"
                  className="navLink"
                  activeClassName="activeLink"
                >
                  About
                </NavLink>
              </div>
            </div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about/" component={About} />
              <Route path="/account/" component={Account} />
              <Route path="/groups/" component={Groups} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    } else {
      return <LogInPage logIn={this.logIn.bind(this)} />;
    }
  }
}

export default AppRouter;
