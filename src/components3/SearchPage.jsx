import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(filteredProducts); // Optional: for debugging

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7072/api/Product',);
        setProducts(response.data.data); // assumes you're returning a list of products directly
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!query) return;

    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(lowerCaseQuery) ||
        product.category?.toLowerCase().includes(lowerCaseQuery) ||
        product.primeColor?.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setFilteredProducts(filtered);
  }, [query, products]);

  if (loading) return <div className="p-20 text-xl">Loading...</div>;
  if (error) return <div className="p-20 text-red-500">{error}</div>;

  return (
    <div className="p-20">
      <h1 className="text-2xl font-semibold text-gray-600 mb-6">
        Search Results for "<span className="text-black">{query}</span>"
      </h1>

      {filteredProducts.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group border rounded-lg shadow-md p-4 flex flex-col items-center transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.imageUrl} // backend returns this field
                alt={product.name}
                className="h-40 w-40 object-cover mb-4"
              />
              <h2 className="text-lg font-serif">{product.name}</h2>
              <p className="text-gray-500">{product.primeColor}</p>
              <p className="text-gray-800 font-semibold">₹{product.price}</p>
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
      )}
    </div>
  );
};

export default SearchPage;
