import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminPanel from './NavPanel';

const AdminDashBoard = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data for users and products
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:5000/users');
                const productsResponse = await axios.get('http://localhost:5000/products');

                setUsers(usersResponse.data);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    // Extract orders from user data
    const orders = users.flatMap((user) => user.orders || []);

    // Calculate total revenue
    const totalRevenue = orders.reduce((total, order) => total + order.totalPrice, 0);

    // Count the total number of sold products
    const countSoldProducts = () => {
        let soldCount = 0;

        // Iterate over orders to count sold products
        orders.forEach((order) => {
            order.cartItems.forEach((item) => {
                soldCount += item.quantity; // Assuming each cartItem has a quantity field
            });
        });

        return soldCount;
    };

    const totalSoldProducts = countSoldProducts();

    // Total Products available (Men + Women)
    const totalProducts = products.length;

    return (
        <AdminPanel>
            <div className="flex">
                {/* Dashboard Content */}
                <div className="w-4/5 p-8">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Users Count */}
                        <div className="bg-blue-500 text-white p-6 rounded-lg">
                            <h2 className="text-lg font-semibold">Total Users</h2>
                            <p className="text-3xl">{users.length}</p>
                        </div>

                        {/* Orders Count */}
                        <div className="bg-blue-500 text-white p-6 rounded-lg">
                            <h2 className="text-lg font-semibold">Total Orders</h2>
                            <p className="text-3xl">{orders.length}</p>
                        </div>

                        {/* Total Revenue */}
                        <div className="bg-blue-500 text-white p-6 rounded-lg">
                            <h2 className="text-lg font-semibold">Total Revenue</h2>
                            <p className="text-3xl">₹{totalRevenue}</p>
                        </div>

                        {/* Total Products Sold */}
                        <div className="bg-blue-500 text-white p-6 rounded-lg">
                            <h2 className="text-lg font-semibold">Total Products Sold</h2>
                            <p className="text-3xl">{totalSoldProducts}</p>
                        </div>

                        {/* Total Products Available */}
                        <div className="bg-blue-500 text-white p-6 rounded-lg">
                            <h2 className="text-lg font-semibold">Total Products Available</h2>
                            <p className="text-3xl">{totalProducts}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanel>
    );
};

export default AdminDashBoard;
