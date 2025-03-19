import axios from "axios";

const BASE_URL = "http://localhost:4000/booking";

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, bookingData);

    return response.data;
  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error;
  }
};

export const getBookingByReferenceCode = async (referenceCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/reference/${referenceCode}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

export const getBookings = async (status) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/?status=${status ? status : ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};
