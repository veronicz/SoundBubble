import React, { Component } from 'react';
import Home from '../components/Home/Home.jsx';
import Account from '../components/Account/Account.jsx';
import About from '../components/About/About.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import '../stylesheets/Heading.css';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <img src='/Background/avatar.png' className='headImg'></img>
          <h1 className='headId'>SoundBubble</h1>
          <ul className='navContainer'>
              <li><Link to={'/'} className='navLink'>Home</Link></li>
              <li><Link to={'/Account'} className='navLink'>Account</Link></li>
              <li><Link to={'/About'} className='navLink'>About</Link></li>
          </ul>
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
