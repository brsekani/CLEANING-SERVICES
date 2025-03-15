import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiBriefcase,
} from "react-icons/fi";
import Lottie from "lottie-react";
import errorAnimation from "../assets/animatedImages/error.json";
import networkErrorAnimation from "../assets/animatedImages/networkError.json";

const mockBookings = {
  ABC123: {
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    email: "john@example.com",
    service: "Residential Cleaning",
    city: "London",
    address: "123 Baker Street",
    ratePerHour: "$200/hr",
    status: "Confirmed",
  },
  XYZ789: {
    firstName: "Jane",
    lastName: "Smith",
    phone: "9876543210",
    email: "jane@example.com",
    service: "Office & Commercial Cleaning",
    city: "Manchester",
    address: "45 Kings Road",
    ratePerHour: "$250/hr",
    status: "Pending",
  },
};

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState(false);

  const handleTrack = () => {
    setNetworkError(false);
    setError("");

    if (Math.random() < 0.1) {
      setNetworkError(true);
      return;
    }

    if (mockBookings[trackingId]) {
      setBookingDetails(mockBookings[trackingId]);
    } else {
      setBookingDetails(null);
      setError("Invalid tracking ID. Please check and try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 h-full w-full px-6 py-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-[#11365C] mb-6"
        >
          Track Your Booking
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <input
            type="text"
            placeholder="Enter Booking Reference"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#11365C]"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTrack}
          className="w-full bg-[#FFDA6C] text-[#11365C] hover:bg-[#E6C255] font-semibold py-3 rounded-full text-lg transition duration-300"
        >
          Track Booking
        </motion.button>

        {networkError && (
          <div className="mt-6 text-center">
            <Lottie
              animationData={networkErrorAnimation}
              className="w-52 h-52 mx-auto"
            />
            <p className="text-red-500 font-semibold mt-2">
              Network Error! Please try again later.
            </p>
          </div>
        )}

        {error && !networkError && (
          <div className="mt-6 text-center">
            <Lottie
              animationData={errorAnimation}
              className="w-52 h-52 mx-auto"
            />
            <p className="text-red-500 font-semibold mt-2">{error}</p>
          </div>
        )}

        {bookingDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-[#11365C] text-center mb-4">
              Booking Details
            </h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-2">
                <FiUser className="text-[#11365C]" />
                <span>
                  <strong>Name:</strong> {bookingDetails.firstName}{" "}
                  {bookingDetails.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-[#11365C]" />
                <span>
                  <strong>Phone:</strong> {bookingDetails.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-[#11365C]" />
                <span>
                  <strong>Email:</strong> {bookingDetails.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiBriefcase className="text-[#11365C]" />
                <span>
                  <strong>Service:</strong> {bookingDetails.service}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-[#11365C]" />
                <span>
                  <strong>City:</strong> {bookingDetails.city}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiMapPin className="text-[#11365C]" />
                <span>
                  <strong>Address:</strong> {bookingDetails.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiDollarSign className="text-[#11365C]" />
                <span>
                  <strong>Rate/hour:</strong> {bookingDetails.ratePerHour}
                </span>
              </div>

              <div
                className={`mt-4 px-4 py-2 rounded-md text-center text-lg font-semibold ${
                  bookingDetails.status === "Confirmed"
                    ? "bg-green-100 text-green-700 border border-green-600"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-600"
                }`}
              >
                {bookingDetails.status === "Confirmed" ? (
                  <>
                    <FiCheckCircle className="inline-block mr-2" /> Confirmed
                  </>
                ) : (
                  <>Pending</>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TrackingPage;
