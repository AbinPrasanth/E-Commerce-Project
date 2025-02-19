import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'; 
import axios from 'axios'; 

const Registration = () => {
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '', 
      confirmPassword: '',
      isBlocked:false,
      cart: [],
      orders: [],
    },

    validate: (values) => {
      const errors = {}; 

      if (!values.name) errors.name = 'Name is required';
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) errors.password = 'Password is required';
      if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match';

      return errors;
    },

    onSubmit: async (values) => {
      try {
        const users = await fetchUsers();

        const existingUser = users.find((user) => user.email === values.email);
        if (existingUser) {
          alert('User with this email already exists');
          return;
        }

        await axios.post('http://localhost:5000/users', values, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });

        navigate('/login');
      } catch (error) {
        console.error('Error registering user:', error); 
        alert('Failed to register. Please try again later.'); 
      }
    },
  });

  return (
    <div className="max-w-sm mx-auto p-4 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formik.values.name} 
            onChange={formik.handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mb-4">{formik.errors.name}</div>
          )}
        </div>


        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email} 
            onChange={formik.handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mb-4">{formik.errors.email}</div>)}
        </div>


        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password} 
            onChange={formik.handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mb-4">{formik.errors.password}</div>)}
        </div>


        <div className="mb-3">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword} 
            onChange={formik.handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mb-4">{formik.errors.confirmPassword}</div>)}
        </div>

        <button
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>

        <div className="mt-3 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
