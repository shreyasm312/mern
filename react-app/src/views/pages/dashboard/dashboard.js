import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  userGetAll,
  userEdit,
  userDelete,
  userClear,
} from '../../../state/actions/user';

import {
  selectUserGetAll,
  selectUserEdit,
  selectUserDelete,
} from '../../../state/selectors';
export class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userGetAll());
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userGetAll !== prevProps.userGetAll) {
      if (this.props.userGetAll.status === 'error') {
        const { dispatch } = this.props;
        dispatch(userClear());
      }
    }
  }
  render() {
    return <div>Dashboard</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  userGetAll: selectUserGetAll,
  userEdit: selectUserEdit,
  userDelete: selectUserDelete,
});
export default connect(mapStateToProps, null)(Dashboard);
