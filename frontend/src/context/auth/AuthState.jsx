import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer, {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
} from './authReducer';

// This is a helper function to set the token in axios headers
// once we're logged in
// In AuthState.jsx

const setAuthToken = (token) => {
  if (token) {
    // This is the standard format
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    isRegistered: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // --- ACTIONS ---
// In AuthState.jsx

// Load User
const loadUser = async (token) => {
  // If we get a token passed in (from login), set it.
  // Otherwise, check localStorage (for page load).
  if (token) {
    setAuthToken(token);
  } else if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('https://ecotrack-hwjg.onrender.com/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data, // The user object
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
const register = async (formData) => {
  try {
    const res = await axios.post(
      'https://ecotrack-hwjg.onrender.com/api/auth/register',
      formData
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

  } catch (err) {
    // ... (your catch block stays the same)
  }
};

// Login User
const login = async (formData) => {
  try {
    const res = await axios.post(
      'https://ecotrack-hwjg.onrender.com/api/auth/login',
      formData
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Pass the new token directly
    loadUser(res.data.token);
  } catch (err) {
    // ... (your catch block stays the same)
  }
};

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        isRegistered: state.isRegistered, // <--- ADD THIS LINE!
        register,
        login,
        logout,
        loadUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;