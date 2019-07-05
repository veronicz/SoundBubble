import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AppRouter from './components/AppRouter.jsx';
import LogInPage from './components/LogInPage.jsx';

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.ready ? <AppRouter /> : <LogInPage />}
      </div>
    );
  }
}

export default withTracker(props => {
  return { ready: Accounts.loginServicesConfigured() && Meteor.user() };
})(App);
