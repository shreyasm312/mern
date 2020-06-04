import { all, put, takeLatest } from 'redux-saga/effects';
import { userActionTypes } from '../constants';
import {
  registerAPI,
  loginAPI,
  userGetAllAPI,
  userEditAPI,
  userDeleteAPI,
} from '../api/user';
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
export function* userGetAll({ payload }) {
  try {
    const response = yield userGetAllAPI(payload);
    yield put({
      type: userActionTypes.USER_GET_ALL_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield put({
      type: userActionTypes.USER_GET_ALL_FAILURE,
      payload: err,
    });
  }
}
export function* userEdit({ payload }) {
  try {
    const response = yield userEditAPI(payload);
    yield put({
      type: userActionTypes.USER_EDIT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield put({
      type: userActionTypes.USER_EDIT_FAILURE,
      payload: err,
    });
  }
}
export function* userDelete({ payload }) {
  try {
    const response = yield userDeleteAPI(payload);
    yield put({
      type: userActionTypes.USER_DELETE_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield put({
      type: userActionTypes.USER_DELETE_FAILURE,
      payload: err,
    });
  }
}
export default function* root() {
  yield all([
    takeLatest(userActionTypes.USER_LOGIN, userLogin),
    takeLatest(userActionTypes.USER_REGISTER, userRegister),
    takeLatest(userActionTypes.USER_GET_ALL, userGetAll),
    takeLatest(userActionTypes.USER_EDIT, userEdit),
    takeLatest(userActionTypes.USER_DELETE, userDelete),
  ]);
}
