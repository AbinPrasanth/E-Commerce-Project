import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch orders for the authenticated user
    axios.get("https://localhost:7072/api/OrderDetails/user", {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        setOrders(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li
              key={order.orderNumber}
              className="mb-4 border p-4 rounded-lg shadow shadow-yellow-300"
            >
              <h1>
                <strong>Date:</strong>
                {(order.createdAt).toLocaleString()}
              </h1>
              <div className="font-semibold">Order ID: {order.id}</div>
              <div>Total: ₹{order.totalAmount}</div>
              <div>Delivery Address: {order.deliveryAddress}</div>
              <div>Contact number: {order.contactNumber}</div>


              <div className="mt-2">
                <h3 className="font-semibold">Items:</h3>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {item.productName} (x{item.quantity})
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
