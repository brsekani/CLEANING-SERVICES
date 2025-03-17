import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Booking Table Component
const BookingTable = ({ bookings, openAcceptModal, openRejectModal }) => {
  const navigate = useNavigate();

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
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-[#FFDA6C] hover:bg-gray-100 transition h-14"
                onClick={() => navigate(`/admin/booking/${booking.id}`)}
              >
                <td className="p-3">{booking.name}</td>
                <td className="p-3">{booking.email}</td>
                <td className="p-3">{booking.service}</td>
                <td
                  className={`p-3 font-semibold ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </td>
                <td className="p-3">{booking.date}</td>
                <td className="p-3 sm:p-4 space-x-2">
                  {booking.status === "Pending" ? (
                    <>
                      <button
                        className="px-3 py-1 min-w-[80px] text-xs sm:text-sm bg-[#3FA34D] text-white rounded-full hover:bg-[#368B40] transition"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents row click event
                          openAcceptModal({
                            id: booking.id,
                            name: booking.name,
                          });
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1 min-w-[80px] text-xs sm:text-sm bg-[#D64550] text-white rounded-full hover:bg-[#B83236] transition"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents row click event
                          openRejectModal({
                            id: booking.id,
                            name: booking.name,
                          });
                        }}
                      >
                        Reject
                      </button>
                    </>
                  ) : booking.status === "Processed" ? (
                    <span className="text-green-600 font-semibold">
                      Already Processed
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">Canceled</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-500">
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
  return status === "Processed"
    ? "text-[#3FA34D]"
    : status === "Pending"
    ? "text-[#FFDA6C]"
    : "text-[#D64550]";
};

// 🔥 **Prop Types Validation**
BookingTable.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      service: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["Pending", "Processed", "Canceled"]).isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  openAcceptModal: PropTypes.func.isRequired,
  openRejectModal: PropTypes.func.isRequired,
};

export default BookingTable;
