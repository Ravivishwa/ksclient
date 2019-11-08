import { fromJS } from 'immutable';
import * as actions from './constants';

export const initialState = fromJS({
  events: null,
  eventsLoading: false,
  eventsError: null,
  header:null
});

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.EVENTS_REQUEST:
      return state
        .set('events', null)
        .set('eventsLoading', true)
        .set('eventsError', false);
    case actions.EVENTS_FAILURE:
      return state
        .set('events', null)
        .set('eventsError', action.payload)
        .set('eventsLoading', false);
    case actions.EVENTS_SUCCESS:
      return state
        .set('events', action.payload)
        .set('eventsError', null)
        .set('eventsLoading', false);
    case actions.SET_HEADER:
      return state
        .set('header','Event Manager')
    default:
      return state;
  }
}

export default eventsReducer;
