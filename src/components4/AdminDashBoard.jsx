import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminPanel from './NavPanel';

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

const AdminDashBoard = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState([]);
    const [totalSoldProducts, setTotalPoductSold] = useState([]);
    const [totalOrders, setTotalOrders] = useState([])


    useEffect(() => {
        // Fetch data for users and products
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('https://localhost:7072/api/User/allUsers', getAuthHeader());
                const productsResponse = await axios.get('https://localhost:7072/api/Product', getAuthHeader());
                const totalRevenueResponse = await axios.get('https://localhost:7072/api/TotalRevenue', getAuthHeader());
                const totalPoductSoldResponse = await axios.get('https://localhost:7072/api/AllPurchase/total-products-purchased', getAuthHeader());
                const totalOrdersResponse = await axios.get('https://localhost:7072/api/TotalOrders', getAuthHeader());


                setUsers(usersResponse.data.data);
                setProducts(productsResponse.data.data);
                setTotalRevenue(totalRevenueResponse.data.data);
                setTotalPoductSold(totalPoductSoldResponse.data.data);
                setTotalOrders(totalOrdersResponse.data.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    // Extract orders from user data
    const orders = users.flatMap((user) => user.orders || []);

    // Count the total number of sold products


    // Total Products available (Men + Women)
    const totalProducts = products.length;

    return (
        <AdminPanel>
            <div className="flex bg-gray-50 min-h-screen">
                <div className="w-full md:w-4/5 p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Users Count */}
                        <div className="bg-white border-l-4 border-blue-500 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h2>
                            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                        </div>

                        {/* Orders Count */}
                        <div className="bg-white border-l-4 border-indigo-500 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h2>
                            <p className="text-3xl font-bold text-indigo-600">{totalOrders}</p>
                        </div>

                        {/* Total Revenue */}
                        <div className="bg-white border-l-4 border-green-500 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h2>
                            <p className="text-3xl font-bold text-green-600">₹{totalRevenue}</p>
                        </div>

                        {/* Total Products Sold */}
                        <div className="bg-white border-l-4 border-yellow-500 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Products Sold</h2>
                            <p className="text-3xl font-bold text-yellow-600">{totalSoldProducts}</p>
                        </div>

                        {/* Total Products Available */}
                        <div className="bg-white border-l-4 border-pink-500 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Products Available</h2>
                            <p className="text-3xl font-bold text-pink-600">{totalProducts}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanel>
    );
};

export default AdminDashBoard;
