import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const BOOKINGS_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  service: ["Cleaning", "Office Cleaning", "Carpet Cleaning", "Housekeeping"][
    i % 4
  ],
  status: ["Pending", "Completed", "Canceled"][i % 3],
  date: `2024-06-${String(10 + (i % 10)).padStart(2, "0")}`,
  phone: `+123456789${i}`,
  address: `123 Street, City ${i + 1}`,
  notes: `Special request for booking ${i + 1}.`,
  rate: "$200/hr",
}));

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openAcceptModal, openRejectModal } = useContext(AdminContext);

  const booking = BOOKINGS_DATA.find((b) => b.id === Number(id));

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-[#0E355D]">
        <h2 className="text-2xl font-bold">Booking Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-[#FFDB63] text-[#092742] font-semibold rounded-md hover:bg-[#092742] hover:text-[#FFDB63]"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-[#FFDB63] text-[#092742] font-semibold rounded-md hover:bg-[#092742] hover:text-[#FFDB63]"
      >
        ← Back
      </button>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-[#0E355D] mb-4">
          Booking Details
        </h2>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <div>
            <p className="font-semibold text-[#092742]">Customer:</p>
            <p className="text-gray-700">{booking.name}</p>
          </div>
          <div>
            <p className="font-semibold text-[#092742]">Email:</p>
            <p className="text-gray-700">{booking.email}</p>
          </div>
          <div>
            <p className="font-semibold text-[#092742]">Phone:</p>
            <p className="text-gray-700">{booking.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-[#092742]">Address:</p>
            <p className="text-gray-700">{booking.address}</p>
          </div>
          <div>
            <p className="font-semibold text-[#092742]">Service:</p>
            <p className="text-gray-700">{booking.service}</p>
          </div>
          <div>
            <p className="font-semibold text-[#092742]">Rate/hour:</p>
            <p className="text-gray-700">{booking.rate}</p>
          </div>
          <div>
            <p className="font-semibold text-[#092742]">Date:</p>
            <p className="text-gray-700">{booking.date}</p>
          </div>
          <div>
            <p className="font-semibold text-[#092742]">Status:</p>
            <span
              className={`px-3 py-1 rounded-full text-white ${
                booking.status === "Pending"
                  ? "bg-yellow-500"
                  : booking.status === "Completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {booking.status}
            </span>
          </div>
          <div className="col-span-2">
            <p className="font-semibold text-[#092742]">Notes:</p>
            <p className="text-gray-700">{booking.notes}</p>
          </div>
        </div>

        {booking.status === "Pending" && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => openAcceptModal(booking)}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={() => openRejectModal(booking)}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
