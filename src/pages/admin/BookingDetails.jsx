import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select } from "@mantine/core";
import {
  getBookingByReferenceCode,
  updateBookingStatus,
} from "../../api/bookingService";
import { showNotification } from "@mantine/notifications";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedBooking = await getBookingByReferenceCode(id);
        if (!fetchedBooking) {
          throw new Error("Booking not found");
        }
        setBooking(fetchedBooking);
        setStatus(fetchedBooking.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleStatusChange = async (value) => {
    setLoading(true);
    try {
      const updatedBooking = await updateBookingStatus(booking._id, value);
      setStatus(updatedBooking.status);
      showNotification({
        title: "Successfull",
        message: `Booking ${booking.id} status updated to ${updatedBooking.status}`,
        color: "green",
      });
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-[#0E355D]">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-[#0E355D]">
        <h2 className="text-2xl font-bold">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-[#FFDB63] text-[#092742] font-semibold rounded-md hover:bg-[#092742] hover:text-[#FFDB63]"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-[#FFDB63] text-[#092742] font-semibold rounded-md hover:bg-[#092742] hover:text-[#FFDB63]"
      >
        ← Back
      </button>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-[#0E355D] mb-4 text-center">
          Booking Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <InfoItem label="Customer" value={booking.fullName} />
          <InfoItem label="Email" value={booking.email} />
          <InfoItem label="Phone" value={booking.phoneNumber} />
          <InfoItem label="Address" value={booking.address} />
          <InfoItem label="Service" value={booking.service} />
          <InfoItem label="Rate/hour" value={booking.price} />
          <InfoItem label="Date" value={booking.dateForService} />
          <div>
            <p className="font-semibold text-[#092742]">Status:</p>
            <Select
              data={["Pending", "On-Going", "Completed", "Canceled"]}
              value={status}
              onChange={handleStatusChange}
              disabled={loading}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable component for displaying info
const InfoItem = ({ label, value }) => (
  <div>
    <p className="font-semibold text-[#092742]">{label}:</p>
    <p className="text-gray-700 capitalize">{value || "N/A"}</p>
  </div>
);

export default BookingDetails;
