import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { formatDistance } from "date-fns";
import AddReviewModal from "../components/AddReviewModal";
import { getAllReviews } from "../api/ReviewService";

export default function Reviews() {
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // Store fetched reviews
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store any fetch errors
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getAllReviews();
        setReviews(response.data); // Store fetched reviews
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Pagination Logic
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const paginatedReviews = reviews?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(reviews?.length / reviewsPerPage);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32  h-full w-full sm:my-20 my-20 py-10 ">
      <div className="w-full max-w-3xl text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-[#11365C]">
          What Our Clients Say ✨
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12  border-4 border-[#FFDA6C] border-t-[#11365C] rounded-full animate-spin"></div>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Reviews Section */}
        {!loading && !error && paginatedReviews.length > 0 ? (
          <div className="space-y-6">
            {paginatedReviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#11365C] bg-gray-100">
                    <span className="text-[#11365C] font-bold text-lg">
                      {review?.fullName.charAt(0)}
                      {review?.fullName.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg text-[#11365C]">
                        {review?.fullName} {review?.fullName}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatDistance(
                          new Date(review.updatedAt),
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex gap-1 my-2">
                      {[...Array(5)].map((_, i) =>
                        i < Math.floor(review.star) ? (
                          <IoStar key={i} className="text-[#FFDA6C]" />
                        ) : (
                          <IoStarOutline key={i} className="text-gray-400" />
                        )
                      )}
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-600 text-center">No reviews available.</p>
          )
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-lg text-[#11365C] font-medium border border-[#11365C] hover:bg-[#11365C] hover:text-white transition-all ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <span className="text-lg font-semibold text-[#11365C]">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`px-4 py-2 rounded-lg text-[#11365C] font-medium border border-[#11365C] hover:bg-[#11365C] hover:text-white transition-all ${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* Add Review Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsAddReviewModalOpen(true)}
            className="bg-[#FFDA6C] text-[#11365C] w-[180px] h-[50px] sm:w-[200px] sm:h-[55px] rounded-full text-lg sm:text-xl font-semibold shadow-xl hover:bg-[#E6C255] transition-all duration-300"
          >
            Leave a Review
          </button>
        </div>
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        opened={isAddReviewModalOpen}
        onClose={() => setIsAddReviewModalOpen(false)}
        setReviews={setReviews}
      />
    </div>
  );
}
