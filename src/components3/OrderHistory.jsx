import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserDetails(parsedUser);

      // Fetch the user from the database
      axios
        .get(`http://localhost:5000/users/${parsedUser.id}`)
        .then((response) => {
          setOrders(response.data.orders || []);
        })
        .catch((error) => {
          console.error("Error fetching user orders:", error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserDetails(null);
    navigate("/login");
  };

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            
            <li key={order.orderNumber} className="mb-4 border p-4 rounded-lg shadow shadow-yellow-300">
              <h1><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</h1>
              <div className="font-semibold">Order ID: {order.orderNumber}</div>
              <div>Total: ₹{order.totalPrice}</div>
              <div>Delivery Address: {order.deliveryAddress}</div>

              <div className="mt-2">
                <h3 className="font-semibold">Items:</h3>
                <ul>
                  {order.cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
