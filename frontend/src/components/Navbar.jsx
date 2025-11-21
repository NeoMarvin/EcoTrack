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

    // In src/components/Navbar.jsx

    return (
        <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
            
            {/* --- LOGO SECTION --- */}
            <Link to="/" className="flex items-center gap-2 group">
                {/* Custom Leaf SVG Icon */}
                <div className="bg-white p-1.5 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-6 h-6 text-green-700"
                    >
                        <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.5 9.75c0 5.992 5.143 10.25 9.315 10.25 1.57 0 3.031-.54 4.282-1.455.453.493.927.938 1.418 1.325.272.215.662.24.96.06a.75.75 0 00.359-.784 11.172 11.172 0 01-.69-4.26c0-5.046 3.108-9.28 4.58-10.916a.75.75 0 00-.228-1.086 8.737 8.737 0 00-3.757-.928 11.171 11.171 0 01-6.223-1.795z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-2xl font-bold tracking-wide">EcoTrack</span>
            </Link>
            {/* -------------------- */}

            {/* ... Your existing authLinks/guestLinks logic ... */}
            <div>{isAuthenticated ? authLinks : guestLinks}</div>
        </nav>
    );
}    