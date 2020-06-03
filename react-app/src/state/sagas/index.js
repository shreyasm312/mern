import { all, put, takeLatest } from 'redux-saga/effects';
import { userActionTypes } from '../constants';
import { registerAPI, loginAPI } from '../api/user';
export function* userRegister({ payload }) {
  try {
    const response = yield registerAPI(payload);
    yield put({
      type: userActionTypes.USER_REGISTER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield put({
      type: userActionTypes.USER_REGISTER_FAILURE,
      payload: err,
    });
  }
}
export function* userLogin({ payload }) {
  try {
    const response = yield loginAPI(payload);
    yield put({
      type: userActionTypes.USER_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield put({
      type: userActionTypes.USER_LOGIN_FAILURE,
      payload: err,
    });
  }
}
export default function* root() {
  yield all([
    takeLatest(userActionTypes.USER_LOGIN, userLogin),
    takeLatest(userActionTypes.USER_REGISTER, userRegister),
  ]);
}
