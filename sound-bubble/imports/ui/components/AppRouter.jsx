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
           <h1 className='headId'><h1 className="largest">(</h1> <h1 className="smaller">(</h1> <h1 className="smallest">(</h1>  &nbsp; SoundBubble  &nbsp; <h1 className="smallest">)</h1><h1 className="smaller">)</h1><h1 className="largest">)</h1></h1>
           <div className='navContainer'>
              <NavLink exact to={'/'} className='navLink' activeClassName='activeLink'>Home</NavLink>
              <NavLink to={'/Account'} className='navLink' activeClassName='activeLink'>Account</NavLink>
              <NavLink to={'/About'} id='rest' className='navLink' activeClassName='activeLink'>About</NavLink>
           </div>
          <div className="pageContainer">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/account/" component={Account} />
          </Switch>
          </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
