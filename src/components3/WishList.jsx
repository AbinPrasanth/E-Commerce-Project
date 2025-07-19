import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCart } from './CartContext';


const Wishlist = () => {
 const { wishlistItems, removeFromWishlist } = useCart();

  if (!wishlistItems) {
    return <div className="text-center py-20 text-xl">Loading wishlist...</div>;
  }

 return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Your Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <div className="text-center text-gray-600 text-lg animate-pulse">
            Your wishlist is empty. Start adding your favorite products!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {wishlistItems.map(item => (
              <div
                key={item.productId}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-full h-52 object-cover rounded-md mb-4"
                />
                <h4 className="text-lg font-semibold truncate">{item.productName}</h4>
                <p className="text-gray-700 mb-4 font-medium">₹{item.price}</p>

                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
