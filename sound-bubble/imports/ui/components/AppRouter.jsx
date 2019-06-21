import React, { Component } from 'react';
import Home from '../components/Home/Home.jsx';
import Account from '../components/Account/Account.jsx';
import About from '../components/About/About.jsx';
import LogInPage from '../components/LogInPage.jsx';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import '../stylesheets/Heading.css';
import Blaze from 'meteor/gadicc:blaze-react-component';

class AppRouter extends Component {
  constructor(){
    super();
    this.state = {loggedIn: false};
  }

  logIn(){
    this.setState({loggedIn:true});
  }

  render() {
    if (this.state.loggedIn === true){
    return (
      <BrowserRouter>
        <div>
          <img src="/Background/avatar.png" className="headImg" />
          <h1 className="headId">SoundBubble</h1>
          <Blaze template="loginButtons" />
          <div className="navContainer">
            <NavLink
              exact
              to={'/'}
              className="navLink"
              activeClassName="activeLink"
            >
              Home
            </NavLink>
            <NavLink
              to={'/Account'}
              className="navLink"
              activeClassName="activeLink"
            >
              Account
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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/account/" component={Account} />
          </Switch>

        </div>
      </BrowserRouter>
    );
    } else {
      return (<LogInPage logIn= {this.logIn.bind(this)}/>)
    }
  }
}

export default AppRouter;
