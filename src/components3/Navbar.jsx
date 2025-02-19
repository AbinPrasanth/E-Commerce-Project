import React, { useState } from 'react';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useUser } from '../components1/UserContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { uniqueProductCount, setCartItems } = useCart();
  const { logoutUser, isAuthenticated } = useUser();
  const navigate = useNavigate();



  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logoutUser();
    setIsDropdownOpen(false);
    navigate('/');
    setCartItems([]);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value !== "") {
      navigate(`/search/${value}`);
    } else {
      navigate("/products")
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-md p-4 h-20  ">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <img
            src="/brandLogo/Gemini_Generated_Image_9rxnzh9rxnzh9rxn.jpg"
            alt="Shoe Store Logo"
            className="h-20 -mt-5 transition-transform duration-300 transform hover:scale-105"
          />
        </Link>

        <div className="relative w-full max-w-sm">

          <FaSearch className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="mt-2 p-2 pl-10 w-full rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <button onClick={toggleMenu} className="md:hidden text-gray-700 text-2xl">
          ☰
        </button>

        <div className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <div className="p-4">
            <button onClick={toggleMenu} className="text-gray-700 text-2xl"> × </button>

            {/* for mobile scrn */}
            <div className="mt-8 space-y-4 font-medium text-lg">
              <Link to="/" className="block text-gray-700  hover:text-amber-600 py-3">Home</Link>
              <br></br>
              <Link to="/products" className="block text-gray-700  hover:text-amber-600">All</Link>
              <Link to="/products?category=men" className="  block text-gray-700  hover:text-amber-600 py-3">Men</Link>
              <Link to="/products?category=women" className="block text-gray-700  hover:text-amber-600 py-3">Women</Link>
              <Link to="/contact" className="block text-gray-700  hover:text-amber-600 py-3">Contact</Link>
              <Link to="/about" className="block text-gray-700  hover:text-amber-600 py-3">About</Link>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingCart className=" text-gray-700 text-2xl hover:text-amber-500" />
                  {uniqueProductCount > 0 && (
                    <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center">
                      {uniqueProductCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            <div className="relative mt-4">
              {isAuthenticated ? (
                <>
                  <FaUser className="text-gray-700 text-2xl hover:text-amber-500 cursor-pointer" onClick={toggleDropdown} />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </>
              ) : (
                <div className=' space-x-1'>
                  <Link to="/login" className="px-2 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition duration-300">Login</Link>
                </div>
              )}
            </div>


          </div>
        </div>

        {/* for desktop */}

        <div className="hidden mr-5 md:flex items-center space-x-8 font-medium text-lg">
          <Link to="/" className="text-gray-700  hover:text-amber-600 py-3 ">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-amber-600 py-3">All</Link>
          <Link to="/products?category=men" className="  block text-gray-700  hover:text-amber-600 py-3 ">Men</Link>
          <Link to="/products?category=women" className="block text-gray-700  hover:text-amber-600 py-3">Women</Link>
          <Link to="/about" className="text-gray-700  hover:text-amber-600 py-3">About</Link>
          <Link to="/contact" className="text-gray-700  hover:text-amber-600 py-3">Contact</Link>



          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-gray-700 text-2xl hover:text-amber-500" />
              {uniqueProductCount > 0 && (
                <span className="absolute top-[-9px] right-[-4px] text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {uniqueProductCount}
                </span>
              )}
            </div>
          </Link>

          {isAuthenticated ? (
            <>
              <FaUser className="text-gray-700 text-2xl hover:text-amber-500 cursor-pointer" onClick={toggleDropdown} />
              {isDropdownOpen && (
                <div className="absolute right-1 mt-40 w-48  bg-white border border-gray-200 rounded-md shadow-md ">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-500">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100  hover:text-amber-500">Logout</button>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-1">
              <Link to="/login" className="px-2 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition duration-300">Login</Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
