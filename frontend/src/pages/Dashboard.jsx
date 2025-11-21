// In src/pages/Dashboard.jsx

import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/auth/AuthContext';
import ActivityContext from '../context/activity/ActivityContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    // 1. Get contexts
    const authContext = useContext(AuthContext);
    const activityContext = useContext(ActivityContext);
    const navigate = useNavigate();

    // 2. Destructure functions and state
    const { isAuthenticated, loadUser } = authContext;
    const { activities, getActivities, addActivity, deleteActivity, loading } =
        activityContext;

    // 3. Setup local state for the form
    const [newActivity, setNewActivity] = useState({
        title: '',
        description: '',
        category: 'Recycling', // Default category
        points: 10, // Default points
    });
    const { title, description, category, points } = newActivity;

    // 4. useEffect to protect the route and load data
    useEffect(() => {
        // If not logged in, kick to login page
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            // If logged in, load the user (in case of refresh) and get activities
            loadUser();
            getActivities();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, navigate]);

    // 5. Form field change handler
    const onChange = (e) =>
        setNewActivity({ ...newActivity, [e.target.name]: e.target.value });

    // 6. Form submit handler
    const onSubmit = (e) => {
        e.preventDefault();
        // Call the addActivity function from our context
        addActivity({
            title,
            description,
            category,
            points: Number(points), // Make sure points are a number
        });
        // Clear the form
        setNewActivity({
            title: '',
            description: '',
            category: 'Recycling',
            points: 10,
        });
    };

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">
                Your Dashboard
            </h1>

            {/* --- ADD ACTIVITY FORM --- */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Log a New Eco-Action
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Action Title (e.g., "Recycled 10 bottles")
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={onChange}
                            rows="3"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        ></textarea>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                value={category}
                                onChange={onChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="Recycling">Recycling</option>
                                <option value="Planting">Planting</option>
                                <option value="Energy Saving">Energy Saving</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Points
                            </label>
                            <input
                                type="number"
                                name="points"
                                value={points}
                                onChange={onChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                            Log Action
                        </button>
                    </div>
                </form>
            </div>

            {/* --- ACTIVITY LIST --- */}
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Your Logged Actions
                </h2>
                {loading ? (
                    <p>Loading your actions...</p>
                ) : activities.length > 0 ? (
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div
                                key={activity._id}
                                className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700">
                                        {activity.title}
                                    </h3>
                                    <p className="text-gray-600">{activity.description}</p>
                                    <p className="text-sm text-gray-500">
                                        Category: {activity.category} | Points: {activity.points}
                                    </p>
                                </div>
                                <button
                                    onClick={() => deleteActivity(activity._id)}
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You haven't logged any actions yet. Start today!</p>
                )}
            </div>
        </div>
    );
}