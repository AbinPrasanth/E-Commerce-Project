import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavPanel from './NavPanel';


const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          'https://localhost:7072/api/OrderDetails/admin/all',
          getAuthHeader()
        );
        setOrders(res.data.data);
      } catch (err) {
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
        <NavPanel>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="border p-4 rounded-md mb-6 shadow-md">
            <h2 className="text-lg font-semibold mb-1">Order Number: {order.orderId}</h2>
            <p><strong>User:</strong> {order.userName}</p>
            <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
            <p><strong>Contact Number:</strong> {order.contactNumber}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

            <h3 className="font-semibold mt-4 mb-2">Items:</h3>
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Product Name</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{item.productName}</td>
                    <td className="border p-2">{item.category}</td>
                    <td className="border p-2">{item.size}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
    </NavPanel>
  );
};

export default OrdersPage;
