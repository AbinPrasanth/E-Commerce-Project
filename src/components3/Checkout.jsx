import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [userInfo, setUserInfo] = useState({ number: '', email: '' });
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!deliveryAddress.trim() || !userInfo.number.trim()) {
      toast.warning("Please enter both contact number and delivery address.");
      return;
    }

    const orderPayload = {
      deliveryAddress: deliveryAddress,
      contactNumber: userInfo.number,
      totalAmount: totalPrice,
      items: cartItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        category: item.category,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const response = await axios.post("https://localhost:7072/api/Order", orderPayload, getAuthHeader());
      setOrderId(response.data.data.id);
      toast.success("Order placed. You can now proceed to PayPal payment.");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong while placing the order.");
    }
  };

  const handlePayPalApproval = async (data) => {
    try {
      await axios.post(
        "https://localhost:7072/api/Order/paypal/confirm",
        {
          orderId: orderId,
          payPalOrderId: data.orderID,
        },
        getAuthHeader()
      );

      toast.success("Payment successful with PayPal ✅");
      clearCart();
      navigate("/orderinvoice");
    } catch (err) {
      console.error("Payment confirmation failed:", err);
      toast.error("Payment verification failed ❌");
    }
  };

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Purchased Products</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-300 rounded-md shadow-sm">
              <div>
                <p className="text-base font-medium">{item.productName}</p>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right sm:text-left mt-2 sm:mt-0">
                <p className="text-lg font-semibold text-gray-800">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Total: ₹{totalPrice}</h2>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Contact Number</h2>
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Phone Number"
          value={userInfo.number}
          onChange={(e) => setUserInfo({ ...userInfo, number: e.target.value })}
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
        {!orderId ? (
          <button
            onClick={handlePlaceOrder}
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-400 ease-in-out"
          >
            Place Order (Cash On Delivery)
          </button>
        ) : totalPrice > 0 ? (
          <div className="mt-4">
            <h2 className="text-md font-medium mb-2">Pay with PayPal</h2>
            <PayPalScriptProvider options={{ clientId: "AX-foHL8TyEIXPxsnOIDjbWwYSmUVSn-vV8HUfRWjYNniEuRihMycmXKkqYHnJ3VfcjJfjSOdmCNR4fg" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => handlePayPalApproval(data)}
              />
            </PayPalScriptProvider>
          </div>
        ) : (
          <p className="text-sm text-red-500 mt-2">Invalid total price. Cannot proceed to payment.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
