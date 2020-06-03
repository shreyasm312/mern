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
        draft.register.userID = payload.data.userID;
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
    },
    userState
  ),
};
