import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectLogin } from '../../state/selectors';

const PrivateRoute = ({ component: Component, login, ...rest }) => {
  let isAuthentificated = login ? login.isAuthentificated : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthentificated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default connect(mapStateToProps)(PrivateRoute);
