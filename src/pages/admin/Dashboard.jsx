import React, { useContext } from "react";
import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const bookingsData = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      service: "House Cleaning",
      status: "Pending",
      date: "June 12, 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      service: "Office Cleaning",
      status: "Pending",
      date: "June 14, 2024",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mikejohnson@example.com",
      service: "Deep Cleaning",
      status: "Canceled",
      date: "June 10, 2024",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emilydavis@example.com",
      service: "Carpet Cleaning",
      status: "Processed",
      date: "June 8, 2024",
    },
  ];

  const { openRejectModal, openAcceptModal } = useContext(AdminContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0E355D] mb-6">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<FaUsers className="text-blue-500 text-3xl sm:text-4xl" />}
          title="Total Users"
          count="1,245"
          bgColor="bg-blue-100"
        />
        <DashboardCard
          icon={
            <FaClipboardList className="text-yellow-500 text-3xl sm:text-4xl" />
          }
          title="Total Bookings"
          count="530"
          bgColor="bg-yellow-100"
        />
        <DashboardCard
          icon={
            <FaCheckCircle className="text-green-500 text-3xl sm:text-4xl" />
          }
          title="Processed Bookings"
          count="410"
          bgColor="bg-green-100"
        />
        <DashboardCard
          icon={<FaTimesCircle className="text-red-500 text-3xl sm:text-4xl" />}
          title="Canceled Bookings"
          count="120"
          bgColor="bg-red-100"
        />
      </div>

      {/* Recent Bookings Table */}
      <div className="mt-8 bg-white rounded-lg w-full overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-2 items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#0E355D]">
            Recent Bookings
          </h2>

          <Link
            className="text-sm sm:text-lg font-semibold text-[#0E355D] underline"
            to="/admin/bookings/all"
          >
            See All Bookings
          </Link>
        </div>

        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-[#FFDA6C] text-[#11365C] uppercase text-xs sm:text-sm">
              <th className="p-3 sm:p-4 text-left">Customer</th>
              <th className="p-3 sm:p-4 text-left">Email</th>
              <th className="p-3 sm:p-4 text-left">Service</th>
              <th className="p-3 sm:p-4 text-left">Status</th>
              <th className="p-3 sm:p-4 text-left">Date</th>
              <th className="p-3 sm:p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingsData.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-[#FFDA6C] hover:bg-blue-100 transition cursor-pointer"
                onClick={() => navigate(`/admin/booking/${booking.id}`)}
              >
                <td className="p-3 sm:p-4 text-xs sm:text-base">
                  {booking.name}
                </td>
                <td className="p-3 sm:p-4 text-xs sm:text-base">
                  {booking.email}
                </td>
                <td className="p-3 sm:p-4 text-xs sm:text-base">
                  {booking.service}
                </td>
                <td
                  className={`p-3 sm:p-4 font-semibold text-xs sm:text-base ${
                    booking.status === "Processed"
                      ? "text-[#3FA34D]"
                      : booking.status === "Pending"
                      ? "text-[#FFDA6C]"
                      : "text-[#D64550]"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="p-3 sm:p-4 text-xs sm:text-base">
                  {booking.date}
                </td>
                <td className="p-3 sm:p-4 space-x-2">
                  {booking.status === "Pending" && (
                    <>
                      <button
                        className="px-3 py-1 min-w-[80px] text-xs sm:text-sm bg-[#3FA34D] text-white rounded-full hover:bg-[#368B40] transition"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                          openAcceptModal({
                            id: booking.id,
                            name: booking.name,
                          });
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1 min-w-[80px] text-xs sm:text-sm bg-[#D64550] text-white rounded-full hover:bg-[#B53D45] transition"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                          openRejectModal({
                            id: booking.id,
                            name: booking.name,
                          });
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, count, bgColor }) => (
  <div
    className={`p-4 sm:p-6 rounded-lg shadow-lg flex items-center space-x-4 text-[#0E355D] ${bgColor}`}
  >
    <div>{icon}</div>
    <div>
      <h3 className="text-sm sm:text-base md:text-lg font-semibold">{title}</h3>
      <p className="text-lg sm:text-2xl font-bold">{count}</p>
    </div>
  </div>
);

export default Dashboard;
