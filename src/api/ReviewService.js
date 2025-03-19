import axios from "axios";

const BASE_URL = "http://localhost:4000/review";

// Function to create a new review request
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, reviewData);

    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const getAllReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting review:", error);
    throw error;
  }
};
