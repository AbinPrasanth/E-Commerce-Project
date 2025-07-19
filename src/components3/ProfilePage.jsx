import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, } from "react-router-dom";


const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function ProfilePage() {
  const [user, setUser] = useState(null); // State to store user information
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem("token");

      if (!storedUser || !storedUser.id || !token) {
        setError('User is not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7072/api/User/admin/users/${storedUser.id}`, getAuthHeader()); // Fetch user data
        setUser(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user information.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="mb-4 flex ">
        <div>
          <h2 className="text-lg font-semibold">User Information</h2>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button
          onClick={() => navigate('/orderhistory')}
          className="mt-4 px-4 py-2 m-10 rounded border border-gray-500 bg-white text-black
          hover:bg-black hover:text-white transition-all duration-300"> view order history
        </button>
        <button
          onClick={() => navigate('/cart')}
          className="mt-4 px-4 py-2 m-10 rounded border border-gray-500 bg-white text-black
          hover:bg-black hover:text-white transition-all duration-300"> Go To Cart
        </button>
      </div>

    </div>
  );
}

export default ProfilePage;
