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
        const response = await axios.get(`https://localhost:7072/api/Product/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error loading product details:", error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart(product, selectedSize);
  };


  if (loading) return <div>Loading product details...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="flex flex-col md:flex-row p-10 md:p-20 gap-10">
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="flex items-center justify-between mb-4">

        </div>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-80 w-80 object-cover mb-4"
        />
        <p className="text-gray-500 mb-2">{product.description}</p>
        <p className="text-xl text-gray-800 font-semibold mb-1">₹{product.price}</p>
       
      </div>

      <div className="md:w-1/2 mt-4 md:mt-11">
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Select Size:</p>
          <div className="flex flex-wrap gap-3">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-4 py-2 border rounded-md ${selectedSize === size
                  ? "bg-gray-950 text-white"
                  : "bg-white text-black hover:border-gray-950 transition-all duration-200"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-6 px-6 py-2 bg-black text-white hover:text-black hover:bg-white rounded border border-gray-300 hover:border-gray-950 transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
