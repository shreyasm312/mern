import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectLogin } from '../../state/selectors';

export class DefaultRoute extends Component {
  render() {
    let { login } = this.props;
    let status = login.status;
    let isAuthentificated = login ? login.isAuthentificated : false;
    let path = '/login';
    if (isAuthentificated && status === 'success') {
      path = '/dashboard';
    }
    return <Redirect to={path} />;
  }
}
const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default connect(mapStateToProps)(DefaultRoute);
