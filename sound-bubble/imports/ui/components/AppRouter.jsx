import React, { Component } from 'react';
import Home from '../components/Home/Home.jsx';
import Account from '../components/Account/Account.jsx';
import About from '../components/About/About.jsx';
import { BrowserRouter, Route } from 'react-router-dom';

class AppRouter extends Component {
  render() {
    return (
      <div>
        <Home/>
      </div>);
  }
}

export default AppRouter;
