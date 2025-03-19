import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import StarRating from "./StarRating";
import { createReview } from "../api/ReviewService";
import { showNotification } from "@mantine/notifications";

const validationSchema = Yup.object({
  fullName: Yup.string().trim().required("Full Name is required"),
  comments: Yup.string().trim().required("Comment is required"),
  rating: Yup.number().min(1, "Rating is required"),
});

const AddReviewModal = ({ opened, onClose, setReviews }) => {
  if (!opened) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl transition-all">
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

        <Formik
          initialValues={{ fullName: "", comments: "", rating: 1 }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const formattedData = {
              fullName: values.fullName,
              star: values.rating,
              comment: values.comments,
              updatedAt: Date.now(),
            };

            try {
              await createReview(formattedData);
              setReviews((prevReviews) => [formattedData, ...prevReviews]);
              showNotification({
                title: "Success",
                message: "Review submitted successfully",
                color: "green",
              });
              resetForm();
              onClose();
            } catch (err) {
              showNotification({
                title: "Error",
                message: err.message,
                color: "red",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="mt-4 space-y-4">
              <h3 className="text-lg font-bold text-center text-[#11365C]">
                How Was Your Experience?
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Your feedback helps us improve. Let us know your thoughts!
              </p>

              <div className="flex justify-center">
                <StarRating
                  rating={values.rating}
                  setRating={(val) => setFieldValue("rating", val)}
                />
              </div>

              <Field
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg p-3 focus:ring-[#11365C] w-full"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-600 text-sm"
              />

              <Field
                as="textarea"
                name="comments"
                placeholder="Write your review here..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#11365C] placeholder-gray-400"
                rows="4"
              />
              <ErrorMessage
                name="comments"
                component="div"
                className="text-red-600 text-sm"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-full text-[#11365C] font-semibold transition-all ${
                  isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#FFDA6C] hover:bg-[#E6C255]"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

AddReviewModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddReviewModal;
