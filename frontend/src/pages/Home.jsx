import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

export default function Home() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const navigate = useNavigate();

  // Optional: Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-green-700 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Track Your Impact. <br /> Save Our Planet.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Join the community making a difference. Log your eco-actions, earn points, and see your contribution to a greener world.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-white text-green-800 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-green-800 transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How EcoTrack Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              🌱
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">1. Take Action</h3>
            <p className="text-gray-600">
              Do something good! Recycle plastic, plant a tree, or save energy in your home.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              📝
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">2. Log It</h3>
            <p className="text-gray-600">
              Enter your activity in your dashboard. It takes less than 10 seconds to track.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              🏆
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">3. Earn Points</h3>
            <p className="text-gray-600">
              Watch your score grow. Compete with friends and visualize your personal impact.
            </p>
          </div>
        </div>
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="bg-gray-800 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to make a change?</h2>
        <p className="mb-8 text-gray-400">Start your journey towards a sustainable lifestyle today.</p>

        <img 
          src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQ5keYyz6t-9SQMEOET_FqWVQvIV7_XpvemidU-WJ-ag8RfwbIqKB5cwbwqIW8lZsM1EZOF_0Yi5_s-shGdq16jDiSI8jpdv5Bwnz7kwC7G-sFDvnU" 
          alt="Sustainable Lifestyle" 
          className="mx-auto rounded-lg shadow-lg mb-8 w-full max-w-lg border-4 border-green-500/30"
        />

        <Link 
          to="/register" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
        >
          Create Free Account
        </Link>
      </div>

    </div>
  );
}