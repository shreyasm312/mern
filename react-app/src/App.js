import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers';

import Login from './views/pages/login/login';
import Register from './views/pages/register/Register';
import Dashboard from './views/pages/dashboard/dashboard';

import DefaultRoute from './views/utils/DefaultRoute';
import GuestRoute from './views/utils/GuestRoute';
import PrivateRoute from './views/utils/PrivateRoute';

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={DefaultRoute} />
          <Route exact path="/index.html" component={DefaultRoute} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;
