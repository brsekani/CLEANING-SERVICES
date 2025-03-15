import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { formatDistance } from "date-fns";
import AddReviewModal from "../components/AddReviewModal";

// Dummy Reviews Data
const dummyReviews = [
  {
    userId: { firstName: "John", lastName: "Doe" },
    date: new Date("2024-06-01"),
    rating: 4.5,
    comments: "Absolutely outstanding service! Highly recommend!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    userId: { firstName: "Jane", lastName: "Smith" },
    date: new Date("2024-06-02"),
    rating: 5,
    comments: "I was blown away by how spotless everything was!",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    userId: { firstName: "Alice", lastName: "Brown" },
    date: new Date("2024-06-03"),
    rating: 3.5,
    comments: "Good service overall, but a few spots were missed.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    userId: { firstName: "Michael", lastName: "Johnson" },
    date: new Date("2024-06-04"),
    rating: 4,
    comments: "Professional and on time. Would use again.",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    userId: { firstName: "Emily", lastName: "Clark" },
    date: new Date("2024-06-05"),
    rating: 5,
    comments: "Best cleaning service in town!",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    userId: { firstName: "Emily", lastName: "Clark" },
    date: new Date("2024-06-05"),
    rating: 5,
    comments: "Best cleaning service in town!",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

export default function Reviews() {
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const paginatedReviews = dummyReviews.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dummyReviews.length / reviewsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-gray-100 h-full w-full sm:my-10 my-20">
      <div className="w-full max-w-3xl text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-[#11365C]">
          What Our Clients Say ✨
        </h2>

        {/* Reviews Section */}
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
                    {review.userId.firstName.charAt(0)}
                    {review.userId.lastName.charAt(0)}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-[#11365C]">
                      {review.userId.firstName} {review.userId.lastName}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDistance(review.date, new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="flex gap-1 my-2">
                    {[...Array(5)].map((_, i) =>
                      i < Math.floor(review.rating) ? (
                        <IoStar key={i} className="text-[#FFDA6C]" />
                      ) : (
                        <IoStarOutline key={i} className="text-gray-400" />
                      )
                    )}
                  </div>
                  <p className="text-gray-700 text-sm">{review.comments}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
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
      />
    </div>
  );
}
