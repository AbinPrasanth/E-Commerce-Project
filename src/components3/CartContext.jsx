import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../components1/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { currentUser, isAuthenticated } = useUser();

  // Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`https://localhost:7072/api/Cart`, getAuthHeader());
        setCartItems(res.data.data.cartItems || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCartItems([]);
      }
    };

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`https://localhost:7072/api/WishListItem`, getAuthHeader());
        setWishlistItems(res.data.data || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setWishlistItems([]);
      }
    };

    if (isAuthenticated && currentUser) {
      fetchCart();
      fetchWishlist();
    } else {
      setCartItems([]);
      setWishlistItems([]);
    }
  }, [currentUser, isAuthenticated]);

  // ➕ Add to Cart
  const addToCart = async (product, size) => {
    if (!isAuthenticated) {
      alert("Please login to add to cart.");
      return;
    }
    if (!size) {
      alert("Please select a size.");
      return;
    }

    try {
      await axios.post(
        `https://localhost:7072/api/Cart`,
        {
          productId: product.id,
          size: size,
          quantity: 1,
        },
        getAuthHeader()
      );

      toast.success("Added to cart", { autoClose: 1000 });

      const res = await axios.get(`https://localhost:7072/api/Cart`, getAuthHeader());
      setCartItems(res.data.data.cartItems || []);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart.");
    }
  };

  // ➖ Decrease Quantity
  const decreaseQuantity = async (cartItemId) => {
    try {
      await axios.patch(`https://localhost:7072/api/Cart/decrease`, { cartItemId }, getAuthHeader());
      const res = await axios.get(`https://localhost:7072/api/Cart`, getAuthHeader());
      setCartItems(res.data.data.cartItems || []);
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  // ➕ Increase Quantity
  const increaseQuantity = async (cartItemId) => {
    try {
      await axios.patch(`https://localhost:7072/api/Cart/increase`, { cartItemId }, getAuthHeader());
      const res = await axios.get(`https://localhost:7072/api/Cart`, getAuthHeader());
      setCartItems(res.data.data.cartItems || []);
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  // ❌ Remove from Cart
  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`https://localhost:7072/api/Cart/${cartItemId}`, getAuthHeader());
      const res = await axios.get(`https://localhost:7072/api/Cart`, getAuthHeader());
      setCartItems(res.data.data.cartItems || []);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // 🧹 Clear Cart
  const clearCart = async () => {
    setCartItems([]);
  };

  // ❤️ Add to Wishlist
  const addToWishlist = async (productId) => {
    try {
      await axios.post(
        `https://localhost:7072/api/WishListItem`,
        { ProductId: productId }, // send in body
        getAuthHeader() // send headers as 3rd param
      );

      toast.success("Added to wishlist", { autoClose: 1000 });

      const res = await axios.get(
        `https://localhost:7072/api/WishListItem`,
        getAuthHeader()
      );
      setWishlistItems(res.data.data || []);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Failed to add to wishlist");
    }
  };

  // ❌ Remove from Wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `https://localhost:7072/api/WishListItem/${productId}`,
        getAuthHeader()
      );

      toast.success("Removed from wishlist", { autoClose: 1000 });

      // Update local state
      const res = await axios.get(
        `https://localhost:7072/api/WishListItem`,
        getAuthHeader()
      );
      setWishlistItems(res.data.data || []);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove from wishlist");
    }
  };


  // ✅ Check if Product in Wishlist
  const isProductInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const uniqueProductCount = cartItems.length;
  const uniqueWishlistCount = wishlistItems.length;


  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        clearCart,
        addToWishlist,
        isProductInWishlist,
        removeFromWishlist,
        uniqueProductCount,
        uniqueWishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
