import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavPanel = ({ children }) => {
  const location = useLocation();

  const logoutAdmin = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    localStorage.removeItem("loggedInUser");
  };

  const navItems = [
    { path: "/admindashboard", label: "Dashboard" },
    { path: "/adminproductsmanagement", label: "Products Management" },
    { path: "/adminusermanagement", label: "Users Management" },
    { path: "/adminsettings", label: "Admin Settings" },
    { path: "/allorders", label: "Orders" },
    { path: "/", label: "Logout", logout: true },
  ];

  return (
    <div className="flex h-full">
      <div className="w-1/5 bg-gray-800 text-white p-4 fixed max-h-screen min-h-screen">
        <ul className="space-y-10 mt-20">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={item.logout ? logoutAdmin : undefined}
                className={`block px-2 py-1 rounded transition duration-200 ${
                  location.pathname === item.path
                    ? "bg-gray-700 text-blue-400 font-semibold"
                    : "text-white hover:text-gray-400"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-4/5 p-8 ml-60">
        {children}
      </div>
    </div>
  );
};

export default NavPanel;
