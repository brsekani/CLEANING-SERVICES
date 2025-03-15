import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Contact = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  return (
    <section className="py-16 px-6 bg-gray-100" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Contact Info */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-[#11365C] mb-4">
            Get in Touch
          </h2>

          <p className="text-lg text-gray-700 mb-6">
            Have questions? Need a cleaning service?{" "}
            <span className="font-semibold">We're here to help!</span>
            Contact us and let’s make your space shine! ✨
          </p>

          <div className="space-y-4 text-lg text-gray-700">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#11365C]" />
              <Link
                to="https://www.google.com/maps/place/London,+UK"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-[#11365C]"
              >
                123 Clean Street, London, UK
              </Link>
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#11365C]" />
              <Link
                to="tel:+441234567890"
                className="font-semibold hover:text-[#11365C]"
              >
                +44 1234 567 890
              </Link>
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-[#11365C]" />
              <Link
                to="mailto:support@ducklandcleaning.com"
                className="font-semibold hover:text-[#11365C]"
              >
                support@ducklandcleaning.com
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-[#11365C] mb-4">
            Send Us a Message
          </h3>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form submitted:", values);
              alert("Message sent successfully!");
              resetForm(); // Reset form after submission
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Name Input */}
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full p-3 border rounded-lg focus:outline-[#11365C]"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full p-3 border rounded-lg focus:outline-[#11365C]"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <Field
                    as="textarea"
                    rows="4"
                    name="message"
                    placeholder="Your Message"
                    className="w-full p-3 border rounded-lg focus:outline-[#11365C]"
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFDA6C] text-[#11365C] px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#E6C255] transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
