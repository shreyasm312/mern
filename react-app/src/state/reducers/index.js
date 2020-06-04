import { handleActions, parseError } from '../../helpers';
import { userActionTypes, STATUS } from '../constants';
import { message } from 'antd';
export const userState = {
  login: {
    status: STATUS.IDLE,
    data: {},
    loading: false,
    jwt: null,
    isAuthentificated: false,
  },
  register: {
    data: {},
    loading: false,
    status: STATUS.IDLE,
  },
  userGetAll: {
    data: {},
    loading: false,
    status: STATUS.IDLE,
  },
  userEdit: {
    data: {},
    loading: false,
    status: STATUS.IDLE,
  },
  userDelete: {
    data: {},
    loading: false,
    status: STATUS.IDLE,
  },
};
export default {
  user: handleActions(
    {
      [userActionTypes.USER_LOGIN]: (draft, { payload }) => {
        draft.login.isAuthentificated = false;
        draft.login.status = STATUS.RUNNING;
        draft.login.loading = true;
      },
      [userActionTypes.USER_LOGIN_SUCCESS]: (draft, { payload }) => {
        draft.login.data = payload ? payload.data : {};
        draft.login.jwt = payload ? payload.data.jwt : null;
        draft.login.status = STATUS.SUCCESS;
        draft.login.isAuthentificated = true;
        draft.login.loading = false;
        message[draft.login.status](['Login Successful!']);
      },
      [userActionTypes.USER_LOGIN_FAILURE]: (draft, { payload }) => {
        draft.login.data = parseError(payload);
        draft.login.status = STATUS.ERROR;
        draft.login.isAuthentificated = false;
        draft.login.loading = false;
        message[draft.login.status]([
          'Please check your username or password!',
        ]);
      },
      [userActionTypes.USER_REGISTER]: (draft, { payload }) => {
        draft.register.data = payload ? payload.data : {};
        draft.register.status = STATUS.RUNNING;
        draft.register.loading = true;
      },
      [userActionTypes.USER_REGISTER_SUCCESS]: (draft, { payload }) => {
        draft.register.data = payload ? payload : {};
        draft.register.status = STATUS.SUCCESS;
        draft.register.loading = false;
        message[draft.register.status](['Register Successful!']);
      },
      [userActionTypes.USER_REGISTER_FAILURE]: (draft, { payload }) => {
        draft.register.data = parseError(payload);
        draft.register.status = STATUS.ERROR;
        draft.register.loading = false;
        message[draft.register.status](['Please try after some time!']);
      },
      [userActionTypes.USER_GET_ALL]: (draft, { payload }) => {
        draft.userGetAll.data = payload ? payload.data : {};
        draft.userGetAll.status = STATUS.RUNNING;
        draft.userGetAll.loading = true;
      },
      [userActionTypes.USER_GET_ALL_SUCCESS]: (draft, { payload }) => {
        draft.userGetAll.data = payload ? payload : {};
        draft.userGetAll.status = STATUS.SUCCESS;
        draft.userGetAll.loading = false;
      },
      [userActionTypes.USER_GET_ALL_FAILURE]: (draft, { payload }) => {
        draft.userGetAll.data = parseError(payload);
        draft.userGetAll.status = STATUS.ERROR;
        draft.userGetAll.loading = false;
        message[draft.userGetAll.status](['Please try after some time!']);
      },
      [userActionTypes.USER_EDIT]: (draft, { payload }) => {
        draft.userEdit.data = payload ? payload.data : {};
        draft.userEdit.status = STATUS.RUNNING;
        draft.userEdit.loading = true;
      },
      [userActionTypes.USER_EDIT_SUCCESS]: (draft, { payload }) => {
        draft.userEdit.data = payload ? payload : {};
        draft.userEdit.status = STATUS.SUCCESS;
        draft.userEdit.loading = false;
        message[draft.userEdit.status](['User name is updated!']);
      },
      [userActionTypes.USER_EDIT_FAILURE]: (draft, { payload }) => {
        draft.userEdit.data = parseError(payload);
        draft.userEdit.status = STATUS.ERROR;
        draft.userEdit.loading = false;
        message[draft.userEdit.status](['Please try after some time!']);
      },
      [userActionTypes.USER_DELETE]: (draft, { payload }) => {
        draft.userDelete.data = payload ? payload.data : {};
        draft.userDelete.status = STATUS.RUNNING;
        draft.userDelete.loading = true;
      },
      [userActionTypes.USER_DELETE_SUCCESS]: (draft, { payload }) => {
        draft.userDelete.data = payload ? payload : {};
        draft.userDelete.status = STATUS.SUCCESS;
        draft.userDelete.loading = false;
        message[draft.userDelete.status](['User is deleted!']);
      },
      [userActionTypes.USER_DELETE_FAILURE]: (draft, { payload }) => {
        draft.userDelete.data = parseError(payload);
        draft.userDelete.status = STATUS.ERROR;
        draft.userDelete.loading = false;
        message[draft.userDelete.status](['Please try after some time!']);
      },
    },
    userState
  ),
};
