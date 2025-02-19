import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderInvoice = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderDetails = location.state;

    useEffect(() => {
        if (!orderDetails || !orderDetails.userInfo) {
            navigate('/');
        }
    }, []);

    if (!orderDetails || !orderDetails.userInfo) {
        return null;
    }

    const { userInfo, deliveryAddress, cartItems, totalPrice } = orderDetails;

    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold mb-4">Order Invoice</h1>

            <div className="mb-6">
                <h2 className="text-lg font-semibold">Customer Information</h2>
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold">Delivery Address</h2>
                <p>{deliveryAddress}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold">Purchased Products</h2>
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>Category: {item.category}</span>
                            <span>size: {item.selectedSize}</span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold">Total Price</h2>
                <p>₹{totalPrice}</p>
            </div>
            <div className='flex gap-4'>
                <div className="mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Back to Home
                    </button>
                </div>
                <div className="mt-8">
                    <button
                        onClick={() => navigate('/profile')}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Check Profile
                    </button>
                </div>
            </div> 
        </div>
    );
};

export default OrderInvoice;
