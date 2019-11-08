/*
 *
 * User reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import * as actions from './constants';

export const initialState = fromJS({
  authenticated: false,
  authenticating: false,
  token: localStorage.getItem('token'),
  error: null,
  notice: null,
});

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case actions.AUTH_REQUEST:
        return state
          .set('authenticating', true)
          .set('authenticated', false)
          .set('error', null)
          .set('notice', null);
      case actions.AUTH_SUCCESS:
        localStorage.setItem('token', action.payload);
        return state
          .set('authenticating', false)
          .set('authenticated', true)
          .set('token', action.payload)
          .set('error', null)
          .set('notice', null);
      case actions.AUTH_FAILURE:
        localStorage.removeItem('token');
        return state
          .set('authenticating', false)
          .set('authenticated', false)
          .set('error', action.payload)
          .set('token', null);
      case actions.LOGOUT_REQUEST: {
        const { error } = state;
        localStorage.clear();
        return initialState
          .set('token', null)
          .set('authenticated', false)
          .set('impersonating', false)
          .set('error', error)
          .set('notice', action.payload);
      }
      default:
        return state;
    }
  });

export default userReducer;
