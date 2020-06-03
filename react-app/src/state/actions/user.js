import { createActions } from 'redux-actions';
import { userActionTypes } from '../constants';

export const { userLogin: login, userRegister: register } = createActions({
  [userActionTypes.USER_LOGIN]: (data) => ({ data }),
  [userActionTypes.USER_REGISTER]: (data) => ({ data }),
});
