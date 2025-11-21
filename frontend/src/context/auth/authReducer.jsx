// We'll define these action types as strings, but this
// is a common pattern to avoid typos.
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // When we log in, save the token from the payload
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        isRegistered: false,
      };
    case REGISTER_SUCCESS: // <-- This one does NOT log in
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        isRegistered: true, // <-- SET THIS TO TRUE
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload, // The user data (name, email, etc.)
        isRegistered: false
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        isRegistered: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        isRegistered: false,
      };
        
    default:
      return state;
  }
};