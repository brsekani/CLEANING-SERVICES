import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Booking Table Component
const BookingTable = ({ bookings }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="bg-[#FFDA6C] text-[#11365C] uppercase text-sm">
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr
                key={booking.referenceCode}
                className="border-b border-[#FFDA6C] hover:bg-gray-100 transition h-14"
                onClick={() =>
                  navigate(`/admin/booking/${booking.referenceCode}`)
                }
              >
                <td className="p-3">{booking.fullName}</td>
                <td className="p-3">{booking.email}</td>
                <td className="p-3">{booking.service}</td>
                <td
                  className={`p-3 font-semibold ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </td>
                <td className="p-3">{formatDate(booking.dateForService)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Status Colors
const getStatusColor = (status) => {
  return status === "Completed"
    ? "text-[#3FA34D]" // Green for Completed
    : status === "Pending"
    ? "text-[#FFDA6C]" // Yellow for Pending
    : status === "On-Going"
    ? "text-[#3498db]" // Blue for On-Going
    : "text-[#D64550]"; // Red for Cancelled
};
// 🔥 **Prop Types Validation**
BookingTable.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      service: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["Pending", "Completed", "Canceled"]).isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookingTable;
