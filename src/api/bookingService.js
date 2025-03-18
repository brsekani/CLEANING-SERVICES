import axios from "axios";

const BASE_URL = "http://localhost:4000/booking";

// Function to create a new booking request
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

// Function to fetch all bookings (if needed)
export const getBookings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Function to get a single booking by ID (if needed)
export const getBookingById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

// Function to cancel/delete a booking (if needed)
export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
