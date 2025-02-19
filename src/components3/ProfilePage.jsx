import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null); // State to store user information
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user from local storage

      if (!storedUser || !storedUser.id) {
        setError('User is not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/users/${storedUser.id}`); // Fetch user data
        setUser(response.data);
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
          <p><strong>Name:</strong> {user.name}</p>
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
      

      <div className="mb-6">
        <h2 className="text-lg font-bold">Orders</h2>
        {user.orders && user.orders.length > 0 ? (
          <ul>
            {user.orders.map((order, index) => (
              <li key={index} className="border p-2 mb-2 rounded">
                <p><strong>Order Number:</strong> {order.orderNumber}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <h3 className="text-md font-semibold mt-2">Products:</h3>
                <ul className="pl-4">
                  {order.cartItems.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-2">
                      <p className='font-bold text-blue-500'> {item.name}</p>
                      <p><strong>Size:</strong> {item.selectedSize}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Color:</strong> {item.primeColor}</p>
                      <p><strong>Price:</strong> ₹{item.price * item.quantity}</p>
                    </li>
                  ))}
                </ul>
                <p><strong>Total Price:</strong><span className='text-green-500 font-semibold'>₹{order.totalPrice}</span></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>

    </div>
  );
}

export default ProfilePage;
