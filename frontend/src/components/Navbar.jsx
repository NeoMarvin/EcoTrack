import React, { useContext } from 'react'; // 1. Add { useContext }
import { Link, useNavigate } from 'react-router-dom'; // 2. Add useNavigate
import AuthContext from '../context/auth/AuthContext'; // 3. Import the context
import ActivityContext from '../context/activity/ActivityContext';

export default function Navbar() {
    // 4. Get the auth state and functions
    const authContext = useContext(AuthContext);
    const activityContext = useContext(ActivityContext);


    const { isAuthenticated, logout, user } = authContext;
    const { clearActivities } = activityContext;

    const navigate = useNavigate();

    // 5. Create the onLogout function
    const onLogout = () => {
        logout(); // This clears the token
        clearActivities();
        navigate('/login'); // Redirect to login
    };

    // 6. Define links for a logged-in user
    const authLinks = (
        <div className="space-x-4">
            {/* Show the user's name */}
            <span className="text-gray-200">Hello, {user && user.name}</span>
            <Link to="/dashboard" className="hover:text-gray-200">
                Dashboard
            </Link>
            <button
                onClick={onLogout}
                className="hover:text-gray-200 bg-transparent border-none"
            >
                Logout
            </button>
        </div>
    );

    // 7. Define links for a guest (logged-out) user
    const guestLinks = (
        <div className="space-x-4">
            <Link to="/" className="hover:text-gray-200">
                Home
            </Link>
            <Link to="/login" className="hover:text-gray-200">
                Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
                Register
            </Link>
        </div>
    );

    return (
        <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                <Link to="/">EcoTrack</Link>
            </h1>

            {/* 8. Use a ternary operator to show the correct links */}
            <div>{isAuthenticated ? authLinks : guestLinks}</div>
        </nav>
    );
}