import React, { Component } from 'react';
import Home from '../components/Home/Home.jsx';
import Account from '../components/Account/Account.jsx';
import About from '../components/About/About.jsx';
import Groups from '../components/Groups/Groups.jsx';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import '../stylesheets/Heading.css';

export default class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="pageWrapper">
          <div className="headerContainer">
            <div className="page_title_container">
              <h1 className="header_page_title">SoundBubble</h1>
            </div>
            <div className="navContainer">
              <NavLink
                exact
                to={'/'}
                className="navLink"
                activeClassName="activeLink"
              >
                <span className="glyphicon glyphicon-home" area-hidden="true" />

                <h1 className="navLink_title">Home</h1>
              </NavLink>
              <NavLink
                to={'/Account'}
                className="navLink"
                activeClassName="activeLink"
              >
                <span
                  className="glyphicon glyphicon-headphones"
                  area-hidden="true"
                />
                <h1 className="navLink_title">My Profile</h1>
              </NavLink>
              <NavLink
                to={'/Groups'}
                className="navLink"
                activeClassName="activeLink"
              >
                <span
                  className="glyphicon glyphicon-tasks"
                  area-hidden="true"
                />
                <h1 className="navLink_title">My Groups</h1>
              </NavLink>
              <NavLink
                to={'/About'}
                id="rest"
                className="navLink"
                activeClassName="activeLink"
              >
                <span
                  className="glyphicon glyphicon-info-sign"
                  area-hidden="true"
                />
                <h1 className="navLink_title">About</h1>
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
  }
}
