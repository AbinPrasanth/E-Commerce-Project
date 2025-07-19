import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik'; 
import { useUser } from './UserContext';
import { toast, Toaster } from 'sonner';

const Registration = () => {
  const navigate = useNavigate();
  const { registerUser } = useUser();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: (values) => {
      const errors = {};
      if (!values.fullName) errors.fullName = 'Name is required';
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return errors;
    },

    onSubmit: async (values) => {
      const userData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };

      const result = await registerUser(userData);
      if (result.success) {
        toast.success("Registration successful. You can now login.");
        navigate("/login");
      } else {
        toast.error(result.error);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-400 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg backdrop-blur-md bg-white/20 border border-white/30">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Create Your Account</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white/80 text-blue-600 font-semibold py-2 rounded-md hover:bg-white transition duration-200"
          >
            Register
          </button>

          <div className="text-white text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline font-medium text-blue-600 hover:text-blue-100">
              Login
            </Link>
          </div>
        </form>

        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
};

export default Registration;
