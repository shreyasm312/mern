import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers';

import Login from './views/pages/login/login';
import Register from './views/pages/register/Register';
import Dashboard from './views/pages/dashboard/dashboard';

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
