import { SECURE_API_CALL } from '../../containers/App/constants';
import * as actions from './constants';


export function getEvents() {
  return {
    type: SECURE_API_CALL,
    endpoint: 'event_session',
    method: 'GET',
    onStart: actions.EVENTS_REQUEST,
    onError: actions.EVENTS_FAILURE,
    onSuccess: actions.EVENTS_SUCCESS,
  }
}

// export function addEvent(payload) {
//   console.log(payload)
//   return {
//     type: SECURE_API_CALL,
//     endpoint: 'events',
//     method: 'POST',
//     payload:payload,
//     onStart: actions.ADD_EVENT_REQUEST,
//     onError: actions.ADD_EVENT_FAILURE,
//     onSuccess: actions.ADD_EVENT_SUCCESS,
//   }
// }

export function addEvent(payload) {
  console.log(payload)
  return {
    type: SECURE_API_CALL,
    endpoint: 'add_event',
    method: 'POST',
    payload:payload,
    onStart: actions.ADD_EVENT_REQUEST,
    onError: actions.ADD_EVENT_FAILURE,
    onSuccess: actions.ADD_EVENT_SUCCESS,
  }
}

export function setHeader() {
  return {
    type: actions.SET_HEADER,
  }
}
