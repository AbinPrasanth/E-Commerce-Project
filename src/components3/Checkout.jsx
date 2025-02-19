import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext'; 
import { useNavigate } from 'react-router-dom'; 
import { useUser } from '../components1/UserContext'; 
import axios from 'axios'
import { toast } from 'react-toastify'; 


const Checkout = () => {
  const { cartItems, clearCart } = useCart(); 
  const { currentUser } = useUser(); 

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '', 
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        name: currentUser.name || '', 
        email: currentUser.email || '',
      });
    }
  }, [currentUser]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    console.log("start");

    if (!deliveryAddress.trim()) {
      alert("Please fill out the delivery address.");
      return;
    }

    const orderDetails = {
      orderNumber: generateOrderNumber(),  
      userInfo,
      deliveryAddress,
      cartItems: cartItems.map((item) => ({
        ...item,
        category: item.category, 
      })),
      totalPrice,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await axios.get(`http://localhost:5000/users/${currentUser.id}`);
      if (!response.data) throw new Error("User not found");

      const user = response.data;
      console.log(user);

      await axios.patch(`http://localhost:5000/users/${currentUser.id}`, {
        ...user,
        orders: [...user?.orders, orderDetails]
      });

      clearCart()
      toast.success("Order placed successfully!")

      navigate("/orderinvoice",{state:orderDetails});

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Technical error, please try again.");
    }
   
  };

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Purchased Products</h2>
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name}</span> <span> (Category: {item.category}) (x{item.quantity})</span>
              <span>(Size:{item.selectedSize})</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Total: ₹{totalPrice}</h2>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">User Information</h2>
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
        <input
          type="email"
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Delivery Address</h2>
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Enter your delivery address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <button
          onClick={handlePlaceOrder}
          className="px-6 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-400 ease-in-out"
          >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
