import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './UserContext';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginData.email || !loginData.password) {
      setError("Please enter both email and password");
      return;
    }

    const result = await loginUser(loginData.email, loginData.password);

    if (result.success) {
      toast.success("Login successful!", { autoClose: 2000 });

      if (result.role?.toLowerCase() === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/");
      }
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-400 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg backdrop-blur-md bg-white/20 border border-white/30">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back </h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4 border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-white/70 focus:outline-none bg-white/70 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-white/70 focus:outline-none bg-white/70 text-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white/80 text-blue-600 hover:bg-white text-lg py-2 rounded-md font-semibold transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link to="/registration" className="text-blue-600 font-semibold underline hover:text-blue-100">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
