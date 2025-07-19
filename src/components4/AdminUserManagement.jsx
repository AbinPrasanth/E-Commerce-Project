import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavPanel from './NavPanel';

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://localhost:7072/api/User/allUsers', getAuthHeader());
        setUsers(res.data.data);
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
      await axios.patch(`https://localhost:7072/api/User/block-unblock`, { userId: id, isBlocked: true }, getAuthHeader());
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, isBlocked: true } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      setError('Error blocking user, please try again later.');
    }
  };

  const unblockUser = async (id) => {
    try {
      await axios.patch(`https://localhost:7072/api/User/block-unblock`, { userId: id, isBlocked: false }, getAuthHeader());
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, isBlocked: false } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      setError('Error unblocking user, please try again later.');
    }
  };

  const viewDetails = async (user) => {
    try {
      const cartRes = await axios.get(`https://localhost:7072/api/Cart/user/${user.id}`, getAuthHeader());
      const orderRes = await axios.get(`https://localhost:7072/api/OrderDetails/user/${user.id}`, getAuthHeader());

      const cart = cartRes.data.data || { cartItems: [], grandTotal: 0 };
      const orders = orderRes.data.data || [];

      setSelectedUser({ ...user, cart, orders });
      setShowCart(false);
      setShowOrders(false);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const closeDetails = () => {
    setSelectedUser(null);
    setShowCart(false);
    setShowOrders(false);
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
                  <td className="px-4 py-2 border">{user.fullName}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td className="px-4 py-2 border flex gap-4">
                    <button
                      className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => viewDetails(user)}
                    >
                      Details
                    </button>
                    {user.isBlocked ? (
                      <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={() => unblockUser(user.id)}>
                        Unblock
                      </button>
                    ) : (
                      <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => blockUser(user.id)}>
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
          <div className="mt-6 p-6 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-2">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.fullName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Status:</strong> {selectedUser.isBlocked ? 'Blocked' : 'Active'}</p>

            {/* Toggle Cart */}
            <div className=" mt-4">
            <button
              className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded mb-3 mr-3"
              onClick={() => setShowCart(!showCart)}
            >
              {showCart ? 'Close' : 'View Cart Items'}
            </button>

            {showCart && (
              <>
                <h3 className="text-lg text-red-500 font-bold mt-4">Cart Items</h3>
                {selectedUser.cart.cartItems.length > 0 ? (
                  <>
                    {selectedUser.cart.cartItems.map((item, idx) => (
                      <div key={idx} className="mb-4 p-4 border bg-white rounded shadow">
                        <p><strong>Product Name:</strong> {item.productName}</p>
                        <p><strong>Size:</strong> {item.size}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> ₹{item.price}</p>
                        <p><strong>Total:</strong> ₹{item.totalPrice}</p>
                      </div>
                    ))}
                    <p><strong>Cart Grand Total:</strong> ₹{selectedUser.cart.grandTotal}</p>
                  </>
                ) : (
                  <p>No items in cart.</p>
                )}
              </>
            )}

            {/* Toggle Orders */}
            <button
              className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded mb-3 mr-3"
              onClick={() => setShowOrders(!showOrders)}
            >
              {showOrders ? 'Close' : 'View Orders'}
            </button>

            {showOrders && (
              <>
                <h3 className="text-lg text-red-500 font-bold mt-4">Orders</h3>
                {selectedUser.orders.length > 0 ? (
                  selectedUser.orders.map((order, index) => (
                    <div key={index} className="mb-4 p-4 border bg-white rounded shadow">
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                      <p><strong>Contact:</strong> {order.contactNumber}</p>
                      <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                      <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                    </div>
                  ))
                ) : (
                  <p>No orders found.</p>
                )}
              </>
            )}

            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded ml-auto"
              onClick={closeDetails}
            >
              Close
            </button>
            </div>
          </div>
        )}
      </div>
    </NavPanel>
  );
};

export default AdminUserManagement;
