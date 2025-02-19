import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../components1/UserContext';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); 
  const { currentUser, isAuthenticated } = useUser(); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${currentUser.id}`);
        setCartItems(response.data.cart || []);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    if (currentUser) {

      fetchCartItems();
    }
  }, [currentUser]);

  const updateCart = async (updatedCart) => {
    try {
      if (!isAuthenticated) return;
      await axios.patch(`http://localhost:5000/users/${currentUser.id}`, {
        ...currentUser,
        cart: updatedCart, 
      });
      setCartItems(updatedCart); 
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      alert('Please login.');
      return;
    }
    toast.success("Added to cart" ,{
      autoClose: 1000,
    })

    const updatedCart = [...cartItems];
    const productExists = updatedCart.find((item) => item.id === product.id);

    if (productExists) {
      productExists.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    await updateCart(updatedCart);
  };

  const decreaseQuantity = async (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    await updateCart(updatedCart);
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    await updateCart(updatedCart);
  };

  const clearCart = async () => {
    setCartItems([])
    await axios.patch(`http://localhost:5000/users/${currentUser.id}`, {
      cart: [],
    });
  };

  const uniqueProductCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        uniqueProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};