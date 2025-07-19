import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

const OrderInvoice = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const res = await axios.get("https://localhost:7072/api/OrderDetails", getAuthHeader());
        const orders = res.data.data;
        if (orders && orders.length > 0) {
          // Get the latest order by createdAt descending
          const latest = orders.reduce((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? a : b);
          setOrder(latest);
        } else {
          navigate("/");
        }
      } catch {
        navigate("/");
      }
    };

    fetchLatestOrder();
  }, [navigate]);

  if (!order) return null;

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Order Invoice</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Customer Information</h2>
        <p><strong>Contact Number:</strong> {order.contactNumber}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Delivery Address</h2>
        <p>{order.deliveryAddress}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Purchased Products</h2>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between mb-2">
            <span>{item.productName} (x{item.quantity})</span>
            <span>Category: {item.category}</span>
            <span>Size: {item.size}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Total Price</h2>
        <p>₹{order.totalAmount}</p>
      </section>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Check Profile
        </button>
      </div>
    </div>
  );
};

export default OrderInvoice;
