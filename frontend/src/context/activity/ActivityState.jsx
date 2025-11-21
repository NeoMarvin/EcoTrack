// In src/context/activity/ActivityState.jsx
import React, { useReducer } from 'react';
import axios from 'axios';
import ActivityContext from './ActivityContext';
import activityReducer, {
  GET_ACTIVITIES,
  ADD_ACTIVITY,
  DELETE_ACTIVITY,
  ACTIVITY_ERROR,
  CLEAR_ACTIVITIES,
} from './activityReducer';

const ActivityState = (props) => {
  const initialState = {
    activities: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(activityReducer, initialState);

  // --- ACTIONS ---

  // Get User's Activities
  // We'll update this later to get *only* the user's activities
  const getActivities = async () => {
    try {
      const res = await axios.get('https://ecotrack-hwjg.onrender.com/api/activities');
      dispatch({
        type: GET_ACTIVITIES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ACTIVITY_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Activity
  const addActivity = async (activityData) => {
    try {
      // We send the activity data to our protected backend route
      const res = await axios.post(
        'https://ecotrack-hwjg.onrender.com/api/activities',
        activityData
      );
      
      dispatch({
        type: ADD_ACTIVITY,
        payload: res.data, // The new activity object from the backend
      });
    } catch (err) {
      dispatch({
        type: ACTIVITY_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Delete Activity
  const deleteActivity = async (id) => {
    try {
      await axios.delete(`https://ecotrack-hwjg.onrender.com/api/activities/${id}`);
      
      dispatch({
        type: DELETE_ACTIVITY,
        payload: id, // Send the ID to the reducer to filter it out
      });
    } catch (err) {
      dispatch({
        type: ACTIVITY_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Activities (for when user logs out)
  const clearActivities = () => dispatch({ type: CLEAR_ACTIVITIES });

  return (
    <ActivityContext.Provider
      value={{
        activities: state.activities,
        loading: state.loading,
        error: state.error,
        getActivities,
        addActivity,
        deleteActivity,
        clearActivities,
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
};

export default ActivityState;