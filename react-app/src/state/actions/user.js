import { createActions } from 'redux-actions';
import { userActionTypes } from '../constants';

export const {
  userLogin: login,
  userRegister: register,
  userGetAll,
  userEdit,
  userDelete,
  userClear,
} = createActions({
  [userActionTypes.USER_LOGIN]: (data) => ({ data }),
  [userActionTypes.USER_REGISTER]: (data) => ({ data }),
  [userActionTypes.USER_GET_ALL]: (data) => ({ data }),
  [userActionTypes.USER_EDIT]: (data) => ({ data }),
  [userActionTypes.USER_DELETE]: (data) => ({ data }),
  [userActionTypes.USER_CLEAR]: (data) => ({ data }),
});
