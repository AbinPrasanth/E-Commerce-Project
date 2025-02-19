import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext"; 
import { useParams } from "react-router-dom"; 
import axios from "axios"; 


const ProductPage = () => {
  const { addToCart } = useCart(); 
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); 

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart."); 
      return;
    }
    const productWithSize = { ...product, selectedSize }; 
    addToCart(productWithSize); 
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex p-20 space-x-20">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          className="h-80 w-80 object-cover mb-4"
        />
        <p className="text-gray-500">{product.description}</p>
        <p className="text-gray-800 text-xl">₹{product.price}</p>
        <p className="text-gray-500">Color: {product.primeColor}</p>
      </div>

      <div className="w-1/2 mt-11">
        <div className="my-4">
          <p className="text-lg font-semibold">Select Size:</p>
          <div className="flex space-x-4">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-4 py-2 border rounded-md ${
                  selectedSize === size ? "bg-gray-950 text-white" : "bg-white 300 hover:border-gray-950 transition-all duration-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 px-4 py-2  bg-black text-white hover:text-black hover:bg-white rounded border border-gray-300 hover:border-gray-950 transition-all duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
