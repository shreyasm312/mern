import { keyMirror } from '../../helpers';
export const userActionTypes = keyMirror({
  USER_LOGIN: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_REGISTER: undefined,
  USER_REGISTER_SUCCESS: undefined,
  USER_REGISTER_FAILURE: undefined,
});
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};
