import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from './constants';
import { API_URL } from '../App/constants';

function* authorize({ payload: { username, password } }) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const { token } = yield call(
      request,
      `${API_URL}login_check`,
      { username, password },
      options,
    );
    yield put({ type: AUTH_SUCCESS, payload: token });
  } catch (error) {
    yield put({ type: AUTH_FAILURE, payload: error.message });
  }
}

function* Saga() {
  yield takeLatest(AUTH_REQUEST, authorize);
}

export default Saga;
