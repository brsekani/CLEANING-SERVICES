import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import StarRating from "./StarRating";

const AddReviewModal = ({ opened, onClose }) => {
  const [rating, setRating] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  if (!opened) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !comments.trim()) {
      setError("All fields are required.");
      return;
    }
    setError("");
    console.log({ firstName, lastName, rating, comments });

    // Reset form
    setRating(1);
    setFirstName("");
    setLastName("");
    setComments("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl transition-all">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-[#11365C]">
            Write a Review
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold text-center text-[#11365C]">
            How Was Your Experience?
          </h3>
          <p className="text-sm text-gray-600 text-center">
            Your feedback helps us improve. Let us know your thoughts!
          </p>

          {/* Star Rating Component */}
          <div className="flex justify-center">
            <StarRating rating={rating} setRating={setRating} />
          </div>

          {/* First & Last Name Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:ring-[#11365C] w-full"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:ring-[#11365C] w-full"
              required
            />
          </div>

          {/* Comment Box */}
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#11365C] placeholder-gray-400"
            placeholder="Write your review here..."
            rows="4"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          />

          {/* Error Message */}
          {error && (
            <div className="flex items-center text-red-600 text-sm font-medium">
              <IoMdCloseCircle className="mr-2" size={18} />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!firstName.trim() || !lastName.trim() || !comments.trim()}
            className={`w-full py-3 rounded-full text-[#11365C] font-semibold transition-all 
              ${
                firstName.trim() && lastName.trim() && comments.trim()
                  ? "bg-[#FFDA6C] hover:bg-[#E6C255]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

AddReviewModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddReviewModal;
