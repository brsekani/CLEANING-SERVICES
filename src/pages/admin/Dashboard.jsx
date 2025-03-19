import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getBookings } from "../../api/bookingService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [onGoing, setOnGoing] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const allBookings = await getBookings("");
        const onGoingBookings = await getBookings("On-Going");
        const completedBookings = await getBookings("Completed");
        const canceledBookings = await getBookings("Canceled");

        setBookings(
          allBookings.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )
        );
        setOnGoing(onGoingBookings.length);
        setCompleted(completedBookings.length);
        setCanceled(canceledBookings.length);
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0E355D] mb-6">
        Admin Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-xl text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              icon={
                <FaClipboardList className="text-yellow-500 text-3xl sm:text-4xl" />
              }
              title="Total Bookings"
              count={bookings.length}
              bgColor="bg-yellow-100"
            />
            <DashboardCard
              icon={
                <FaSpinner className="text-blue-500 text-3xl sm:text-4xl animate-spin" />
              }
              title="On-Going..."
              count={onGoing}
              bgColor="bg-blue-100"
            />
            <DashboardCard
              icon={
                <FaCheckCircle className="text-green-500 text-3xl sm:text-4xl" />
              }
              title="Completed Bookings"
              count={completed}
              bgColor="bg-green-100"
            />
            <DashboardCard
              icon={
                <FaTimesCircle className="text-red-500 text-3xl sm:text-4xl" />
              }
              title="Canceled Bookings"
              count={canceled}
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
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#FFDA6C] hover:bg-blue-100 transition cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/booking/${booking.referenceCode}`)
                    }
                  >
                    <td className="p-3 sm:p-4 text-xs sm:text-base capitalize">
                      {booking.fullName}
                    </td>
                    <td className="p-3 sm:p-4 text-xs sm:text-base">
                      {booking.email}
                    </td>
                    <td className="p-3 sm:p-4 text-xs sm:text-base">
                      {booking.service}
                    </td>
                    <td
                      className={`p-3 sm:p-4 font-semibold text-xs sm:text-base ${
                        booking.status === "Completed"
                          ? "text-[#3FA34D]"
                          : booking.status === "Pending"
                          ? "text-[#FFDA6C]"
                          : "text-[#D64550]"
                      }`}
                    >
                      {booking.status}
                    </td>
                    <td className="p-3 sm:p-4 text-xs sm:text-base">
                      {formatDate(booking.dateForService)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
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
