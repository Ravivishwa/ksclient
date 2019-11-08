/*
 *
 * User actions
 *
 */

import * as actions from './constants';

export function authorize(username, password) {
  return {
    type: actions.AUTH_REQUEST,
    payload: { username, password },
  };
}

export function logout(message) {
  return {
    type: actions.LOGOUT_REQUEST,
    payload: message,
  };
}
