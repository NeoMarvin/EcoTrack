
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 1. Import our context
import AuthContext from "../context/auth/AuthContext";

export default function Register() {
    // 2. Get the context and the 'register' function from it
    const authContext = useContext(AuthContext);
    const { register, isRegistered, error, clearErrors } = authContext;

    const navigate = useNavigate();

    // 3. This hook watches for changes to 'isAuthenticated'
    useEffect(() => {
        if (isRegistered) {
            alert('Registration Successful! Please log in.');
            clearErrors();
            navigate("/login");
        }

        if (error) {
            alert(error);
            clearErrors();
        }
        // We'll add error handling here later
    }, [isRegistered, error, navigate, clearErrors]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // 4. We just call the 'register' function from our context!
        // (We can add a check for password2 here if we add that field)
        register({
            name,
            email,
            password,
        });
    };

    // The rest of your JSX form remains exactly the same!
    // ... (paste your <div className="p-10...">...</div> JSX here) ...
    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center text-green-600">
                Create Your Account
            </h1>
            <p className="mt-4 text-center text-gray-600">
                Start tracking your eco-actions today!
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
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
                        minLength="6"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}