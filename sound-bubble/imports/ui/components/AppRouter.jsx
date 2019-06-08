import React, { Component } from 'react';
import Home from '../components/Home/Home.jsx';
import Account from '../components/Account/Account.jsx';
import About from '../components/About/About.jsx';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import '../stylesheets/Heading.css';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <img src='/Background/avatar.png' className='headImg'></img>
          <h1 className='headId'>SoundBubble</h1>
          <div className='navContainer'>
              <NavLink exact to={'/'} className='navLink' activeClassName='activeLink'>Home</NavLink>
              <NavLink to={'/Account'} className='navLink' activeClassName='activeLink'>Account</NavLink>
              <NavLink to={'/About'} id='rest' className='navLink' activeClassName='activeLink'>About</NavLink>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/account/" component={Account} />
          </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
