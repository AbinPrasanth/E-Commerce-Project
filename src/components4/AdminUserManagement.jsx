import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavPanel from './NavPanel';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users');
        setUsers(res.data);
      } catch (error) {
        setError('Error fetching users, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const blockUser = async (id) => {
    try {
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, isBlocked: true } : user
      );
      setUsers(updatedUsers);
      await axios.patch(`http://localhost:5000/users/${id}`, { isBlocked: true });
    } catch (error) {
      setError('Error blocking user, please try again later.');
    }
  };

  const unblockUser = async (id) => {
    try {
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, isBlocked: false } : user
      );
      setUsers(updatedUsers);
      await axios.patch(`http://localhost:5000/users/${id}`, { isBlocked: false });
    } catch (error) {
      setError('Error unblocking user, please try again later.');
    }
  };

  const viewDetails = (user) => {
    setSelectedUser(user);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

  return (
    <NavPanel>
      <div>
        <h1 className="text-lg font-bold mb-4">Registered Users</h1>
        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {users.length === 0 && !loading && <p>No users found.</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td className="px-4 py-2 border flex gap-10 ml-auto">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => viewDetails(user)}
                    >
                      Details
                    </button>
                    {user.isBlocked ? (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => unblockUser(user.id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => blockUser(user.id)}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-2">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Status:</strong> {selectedUser.isBlocked ? 'Blocked' : 'Active'}</p>

            <h3 className="text-lg font-bold mt-4">Orders</h3>
            {selectedUser.orders && selectedUser.orders.length > 0 ? (
              selectedUser.orders.map((order, index) => (
                <div key={index} className="mb-4 shadow-md p-4">
                  <p><strong>Order Number:</strong> {order.orderNumber}</p>
                  <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                  
                  <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                  <h4 className="font-bold mt-2">Cart Items:</h4>
                  {order.cartItems.map((item, idx) => (
                    <div key={idx} className="pl-4 border-2 my-4">
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Size:</strong> {item.selectedSize}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Color:</strong> {item.primeColor}</p>
                    </div>
                  ))}
                  <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}

            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={closeDetails}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </NavPanel>
  );
};

export default AdminUserManagement;
