import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const OrdersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/users'); // Adjust URL if necessary
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Orders</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">User: {user.name} ({user.email})</h2>
            <h3 className="font-semibold mt-4">Orders:</h3>
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div key={order.orderNumber} className="border p-4 rounded-md shadow-md">
                  <h4 className="text-lg font-semibold">Order Number: {order.orderNumber}</h4>
                  <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                  <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                  <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

                  <h5 className="font-semibold mt-4">Cart Items:</h5>
                  <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Product Name</th>
                        <th className="border border-gray-300 p-2">Category</th>
                        <th className="border border-gray-300 p-2">Size</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="border border-gray-300 p-2">{item.name}</td>
                          <td className="border border-gray-300 p-2">{item.category}</td>
                          <td className="border border-gray-300 p-2">{item.selectedSize}</td>
                          <td className="border border-gray-300 p-2">{item.quantity}</td>
                          <td className="border border-gray-300 p-2">${item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
