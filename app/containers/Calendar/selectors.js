import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the landingPage state domain
 */

const selectLandingPageDomain = state => state.calendar || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LandingPage
 */

const makeSelectCalendar = () =>
  createSelector(selectLandingPageDomain, subState => subState.toJS());

export default makeSelectCalendar;
export { selectLandingPageDomain };
