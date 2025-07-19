import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useCart } from './CartContext';


const PAGE_SIZE = 8;

const Products = () => {
  const [allProducts, setAllProducts] = useState([]); // all products fetched
  const [filteredProducts, setFilteredProducts] = useState([]); // after category + price filtering
  const [paginatedProducts, setPaginatedProducts] = useState([]); // products for current page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(5000);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToWishlist, isProductInWishlist } = useCart();


  const category = searchParams.get("category");
  const categoryText =
    category === "men" ? "Men's" : category === "women" ? "Women's" : "All Products";

  useEffect(() => {
    // Fetch all products once (no pagination)
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://localhost:7072/api/Product"); // get all
        setAllProducts(response.data.data); // adjust if needed
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
    // Filter products by category and price
    let filtered = allProducts;

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    filtered = filtered.filter((p) => p.price <= priceRange);

    setFilteredProducts(filtered);
    setCurrentPage(1); // reset page on filter change
  }, [allProducts, category, priceRange]);

  useEffect(() => {
    // Paginate filtered products
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paged = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
    setPaginatedProducts(paged);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">{categoryText}</h1>

      {/* Price Range Filter */}
      <div className="mb-6 ">
        <label className="block text-lg font-semibold mb-2 ">
          Filter by Price: ₹{priceRange}
        </label>
        <input
          type="range"
          min="500"
          max="10000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className=" cursor-pointer accent-amber-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="group border rounded-lg shadow-md p-4 flex flex-col items-center 
                 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-40 w-40 object-cover mb-4"
            />

            <h2 className="text-lg font-serif">{product.name}</h2>
            <p className="text-gray-500">{product.primeColor}</p>
            <p className="text-gray-800">₹{product.price}</p>

            <div className="mt-4 flex items-center gap-3">
              <Link
                to={`/productpage/${product.id}`}
                className="px-4 py-2 rounded border border-gray-500 bg-white text-black
           opacity-0 invisible group-hover:opacity-100 group-hover:visible
           hover:bg-black hover:text-white transition-all duration-300"
              >
                View Details
              </Link>

              <button onClick={() => addToWishlist(product.id)}>
                <FaHeart
                  className={"text-xl  text-gray-500  invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                    }
                  title="Add to Wishlist"
                />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 border rounded ${pageNum === currentPage ? "bg-amber-500 text-white" : ""
                }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
