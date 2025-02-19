import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../components1/UserContext"; // Adjust the path to the actual UserContext file
import { toast } from 'react-toastify'; // Importing toastify
import 'react-toastify/dist/ReactToastify.css'; 

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

    try {
      const response = await fetch("http://localhost:5000/myAdmin");
      const admins = await response.json();

      const admin = admins.find(
        (a) =>
          a.email === loginData.email && a.password === loginData.password
      );

      if (admin) {
        localStorage.setItem("loggedInUser", JSON.stringify(admin));
        navigate("/admindashboard"); 
        return;
      }
    
      const result = await loginUser(loginData.email, loginData.password);

      if (result.success) {
        navigate("/"); 
        toast.success("Login successful!",{
          autoClose: 2000,
        });
      } else {
        setError("invalid email and password"); 
      }
    } catch(error){
      setError("an error accured")
    }
  }

  return (
    <div className="max-w-sm mx-auto p-4 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
        <div className="mt-3 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/registration" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
