import React from 'react';
import { Link } from 'react-router-dom';

const NavPanel = ({ children }) => {

  const logoutAdmin = () => {
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div className="flex h-full  ">

      <div className="w-1/5 bg-gray-800 text-white p-4 fixed max-h-screen min-h-screen">
        <ul className="space-y-10 mt-20">
          <li>
            <Link to="/admindashboard" className="text-white hover:text-gray-400">Dashboard</Link>
          </li>
          <li>
            <Link to="/adminproductsmanagement" className="text-white hover:text-gray-400">Products</Link>
          </li>
          <li>
            <Link to="/adminusermanagement" className="text-white hover:text-gray-400">User Management</Link>
          </li>
          <li>
            <Link  to="/adminsettings" className="text-white hover:text-gray-400">Admin settings</Link>
          </li>
          <li>
            <Link  to="/allorders" className="text-white hover:text-gray-400">Orders</Link>
          </li>
          <li>
            <Link  to="/" onClick={logoutAdmin} className="text-white hover:text-gray-400">Logout</Link>
          </li>
        </ul>
      </div>

      <div className="w-4/5 p-8 ml-60">
        {children}
      </div>
    </div>
  );
};

export default NavPanel;
