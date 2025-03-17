import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/admin/dashboard", label: "Dashboard" },
  { path: "/admin/bookings", label: "Bookings" },
  { path: "/admin/logout", label: "Logoutssss" },
];

const AdminNavbar = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6">
        {navLinks.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              end
              className={`px-4 py-2 rounded-md font-medium transition ${
                location.pathname === path
                  ? "text-white bg-gray-800" // Active Tab
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
