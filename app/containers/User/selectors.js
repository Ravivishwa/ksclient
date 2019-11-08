import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the user state domain
 */

const selectUserDomain = state => state.user || initialState;

const makeSelectToken = () => createSelector(selectUserDomain, subState => (subState ? subState.get('token') : null));

/**
 * Other specific selectors
 */

/**
 * Default selector used by User
 */

const makeSelectUser = () => createSelector(selectUserDomain, subState => subState.toJS());

export default makeSelectUser;
export { selectUserDomain,makeSelectToken };
