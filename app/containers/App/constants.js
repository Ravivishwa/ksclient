/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// export const API_URL = 'http://api.com/';
export const API_URL = 'http://kswaveco.localhost/index.php/api/';

export const PUBLIC_API_CALL = 'app/API/public/call';
export const SECURE_API_CALL = 'app/API/secure/call';
