import React, { Component } from 'react';
import Home from '../components/Home/Home.jsx';
import Account from '../components/Account/Account.jsx';
import About from '../components/About/About.jsx';
import { BrowserRouter, Route } from 'react-router-dom';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/account/" component={Account} />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
