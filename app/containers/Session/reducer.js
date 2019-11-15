import { fromJS } from 'immutable';
import * as actions from './constants';

export const initialState = fromJS({
  guests: null,
  guestsLoading: false,
  guestsError: null,
  sessions: null,
  sessionLoading: false,
  sessionError: null,
  open:false,
  sessionNo:null,
  header:null,
});

function sessionsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GUESTS_REQUEST:
      return state
        .set('guests', null)
        .set('guestsLoading', true)
        .set('guestsError', false);
    case actions.GUESTS_FAILURE:
      return state
        .set('guests', null)
        .set('eventsError', action.payload)
        .set('guestsLoading', false);
    case actions.GUESTS_SUCCESS:
      return state
        .set('guests', action.payload)
        .set('guestsError', null)
        .set('guestsLoading', false);
    case actions.SESSION_REQUEST:
      return state
        .set('sessions', null)
        .set('sessionLoading', true)
        .set('sessionError', false);
    case actions.SESSION_FAILURE:
      return state
        .set('sessions', null)
        .set('sessionError', action.payload)
        .set('sessionLoading', false);
    case actions.SESSION_SUCCESS:
      return state
        .set('sessions', action.payload)
        .set('sessionError', null)
        .set('sessionLoading', false);
    case actions.OPEN_GUEST:
      return state
        .set('open', true)
        .set('sessionNo',action.sessionNo)
        .set('selected', [2,5])
    case actions.ADD_GUEST:
      // console.log(action)
      // return state
      //   .set('selected', true)
      //   .set('sessionNo',action.sessionNo)
    case actions.CLOSE_MODAL:
      return state
        .set('open',false)
    case actions.SET_HEADER:
      return state
        .set('header','Manage Session')
    default:
      return state;
  }
}

export default sessionsReducer;
