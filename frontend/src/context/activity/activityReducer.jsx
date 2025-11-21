// In src/context/activity/activityReducer.js

// Define action types
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const ACTIVITY_ERROR = 'ACTIVITY_ERROR';
export const CLEAR_ACTIVITIES = 'CLEAR_ACTIVITIES';

export default (state, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        loading: false,
      };
    case ADD_ACTIVITY:
      return {
        ...state,
        // Add the new activity to the start of the array
        activities: [action.payload, ...state.activities],
        loading: false,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        // Filter out the deleted activity
        activities: state.activities.filter(
          (activity) => activity._id !== action.payload
        ),
        loading: false,
      };
    case ACTIVITY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ACTIVITIES:
      return {
        ...state,
        activities: [],
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};