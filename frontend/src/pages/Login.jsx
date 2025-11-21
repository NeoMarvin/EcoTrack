import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 1. Import our context
import AuthContext from "../context/auth/AuthContext";

export default function Login() {
    // 2. Get the context and 'login' function
    const authContext = useContext(AuthContext);
    const { login, isAuthenticated, error, clearErrors } = authContext;

    const navigate = useNavigate();

    // 3. This hook watches for changes to 'isAuthenticated'
    useEffect(() => {
        if (isAuthenticated) {
            // If it becomes true (after successful login), go to dashboard
            navigate("/dashboard");
        }

        if (error) {
            alert(error);
            clearErrors();
        }
        // We'll add error handling here later
    }, [isAuthenticated, error, navigate, clearErrors]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // 4. We just call the 'login' function from our context!
        login({
            email,
            password,
        });
    };

    // The rest of your JSX form remains exactly the same!
    // ... (paste your <div className="p-10...">...</div> JSX here) ...
    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center text-indigo-600">
                Login to Your Account
            </h1>
            <p className="mt-4 text-center text-gray-600">
                Welcome back!
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}