import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(5000); // Default price range

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    let filtered = [...products];

    if (category === "men") {
      filtered = filtered.filter((product) => product.category === "men");
    } else if (category === "women") {
      filtered = filtered.filter((product) => product.category === "women");
    }

    filtered = filtered.filter((product) => product.price <= priceRange);

    setFilteredProducts(filtered);
  }, [searchParams, products, priceRange]);

  const category = searchParams.get("category");
  const categoryText =
    category === "men" ? "Men's" : category === "women" ? "Women's" : "All Products";

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">{categoryText}</h1>

      {/* Price Range Filter */}
      <div className="mb-6 ">
        <label className="block text-lg font-semibold mb-2 ">Filter by Price: ₹{priceRange}</label>
        <input
          type="range"
          min="500"
          max="10000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className=" cursor-pointer accent-amber-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group border rounded-lg shadow-md p-4 flex flex-col items-center 
                 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <img src={product.image} alt={product.name} className="h-40 w-40 object-cover mb-4" />

            <h2 className="text-lg font-serif">{product.name}</h2>
            <p className="text-gray-500">{product.primeColor}</p>
            <p className="text-gray-800">₹{product.price}</p>

            <Link
              to={`/productPage/${product.id}`}
              className="mt-4 px-4 py-2 rounded border border-gray-500 bg-white text-black
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   hover:bg-black hover:text-white transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
