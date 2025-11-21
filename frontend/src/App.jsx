// In src/App.js
import React, { useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from './context/auth/AuthContext';

function App() {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
  }, [])
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    {/* 4. ADD THE ROUTE FOR YOUR NEW PAGE */}
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>

            {/* 5. USE YOUR FOOTER COMPONENT */}
            <Footer />
        </>
    );
}

export default App;