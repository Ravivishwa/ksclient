import { SECURE_API_CALL } from '../../containers/App/constants';
import * as actions from './constants';


export function getGuests() {
  return {
    type: SECURE_API_CALL,
    endpoint: 'guests',
    method: 'GET',
    onStart: actions.GUESTS_REQUEST,
    onError: actions.GUESTS_FAILURE,
    onSuccess: actions.GUESTS_SUCCESS,
  }
}

export function getSession(id) {
  return {
    type: SECURE_API_CALL,
    endpoint: `event_data/${id}`,
    method: 'GET',
    onStart: actions.SESSION_REQUEST,
    onError: actions.SESSION_FAILURE,
    onSuccess: actions.SESSION_SUCCESS,
  }
}

export function openGuests(session,no) {
  return {
    type: actions.OPEN_GUEST,
    payload:session,
    sessionNo:no
  }
}

export function addGuests(id,payload) {
  console.log("identifier",id)
  return {
    type: SECURE_API_CALL,
    endpoint: `session_guest/${id}`,
    identifier:id,
    payload:payload,
    method: 'PUT',
    onStart: actions.ADD_GUEST_REQUEST,
    onError: actions.ADD_GUEST_FAILURE,
    onSuccess: actions.ADD_GUEST_SUCCESS,
  }
}

export function close() {
  return {
    type: actions.CLOSE_MODAL,
  }
}

export function setHeader() {
  return {
    type: actions.SET_HEADER,
  }
}

