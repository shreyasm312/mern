import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectLogin } from '../../state/selectors';

export class GuestRoute extends Component {
  render() {
    let {
      component: Component,
      login,
      location: { state },
      ...rest
    } = this.props;
    let { status } = login;
    let isAuthentificated = login ? login.isAuthentificated : false;
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthentificated && status === 'success' ? (
            <Redirect
              to={{
                pathname: '/',
                state,
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default connect(mapStateToProps)(GuestRoute);
