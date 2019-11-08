import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the landingPage state domain
 */

const selectSessionDomain = state => state.event || initialState;
/**
 * Other specific selectors
 */

/**
 * Default selector used by LandingPage
 */

const makeSelectEvent = () =>
  createSelector(selectSessionDomain, subState => subState.toJS());

export default makeSelectEvent;
export { selectSessionDomain };
