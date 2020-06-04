import { keyMirror } from '../../helpers';

export const userActionTypes = keyMirror({
  USER_LOGIN: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_REGISTER: undefined,
  USER_REGISTER_SUCCESS: undefined,
  USER_REGISTER_FAILURE: undefined,
  USER_GET_ALL: undefined,
  USER_GET_ALL_SUCCESS: undefined,
  USER_GET_ALL_FAILURE: undefined,
  USER_EDIT: undefined,
  USER_EDIT_SUCCESS: undefined,
  USER_EDIT_FAILURE: undefined,
  USER_DELETE: undefined,
  USER_DELETE_SUCCESS: undefined,
  USER_DELETE_FAILURE: undefined,
});
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};
