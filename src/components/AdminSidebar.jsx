import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarCheck,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation(); // ✅ Get current route

  // ✅ Function to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-full bg-white text-gray-800 flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          {/* Dashboard */}
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                isActive("/admin/dashboard")
                  ? "bg-[#FFDA6C] text-[#11365C]"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaHome className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Bookings with dropdown */}
          <li>
            <button
              onClick={() => setIsBookingOpen(!isBookingOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-3">
                <FaCalendarCheck className="text-xl" />
                <span>Bookings</span>
              </div>
              <FaChevronDown
                className={`transition-transform ${
                  isBookingOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isBookingOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                {[
                  { path: "/admin/bookings/all", label: "All" },
                  { path: "/admin/bookings/pending", label: "Pending" },
                  { path: "/admin/bookings/canceled", label: "Canceled" },
                  { path: "/admin/bookings/Processed", label: "Processed" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block p-2 rounded-md transition ${
                        isActive(item.path)
                          ? "bg-[#FFDA6C] text-[#11365C]"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#DEE2E6]">
        <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition">
          <FaSignOutAlt className="text-xl text-red-500" />
          <span className="text-red-500">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
