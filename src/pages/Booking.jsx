import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select, TextInput, NumberInput, Textarea } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Validation Schema
const BookingSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  service: Yup.string().required("Please select a service"),
  city: Yup.string().required("Please select your city"),
  hours: Yup.number().min(1, "At least 1 hour is required"),
  address: Yup.string().required("Address is required"),
});

const Booking = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchParams] = useSearchParams();
  const selectedService = searchParams.get("service") || "";

  console.log(selectedService);

  const servicePrices = {
    "Residential Cleaning": 200,
    "Office & Commercial Cleaning": 250,
    "Post-Construction Cleaning": 350,
    "Carpet & Upholstery Cleaning": 30,
    "Window & Glass Cleaning": 15,
    "Specialized Cleaning Services": 400,
  };

  const ukCities = [
    "London",
    "Manchester",
    "Birmingham",
    "Liverpool",
    "Leeds",
    "Sheffield",
    "Bristol",
    "Glasgow",
    "Leicester",
    "Edinburgh",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (showSuccessModal === true) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showSuccessModal]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 h-full w-full px-6 pt-28 py-5"
    >
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#11365C] mb-6">
          Book a Cleaning Service
        </h2>
        <p className="text-center text-gray-700 mb-6">
          If the service you need is not listed, please{" "}
          <span className="font-semibold text-[#11365C]">
            call us at: +123-456-7890
          </span>{" "}
          to book a custom cleaning service.
        </p>

        <Formik
          initialValues={{
            fullName: "",
            lastName: "",
            phone: "",
            email: "",
            service: selectedService || "", // Set selectedService here
            city: "",
            address: "",
            notes: "",
          }}
          validationSchema={BookingSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              console.log("Booking Details:", values);
              const postData = await axios.post(
                "http://localhost:4000/booking/",
                values
              );

              // Show the success modal
              setShowSuccessModal(true);
              console.log(postData);
            } catch (err) {
              console.log(err);
            }

            // Hide the modal after 3 seconds
            // setTimeout(() => {
            //   setShowSuccessModal(false);
            // }, 3000);

            // Reset form fields after submission
            // resetForm();
          }}
        >
          {({ values, errors, touched, setFieldValue }) => {
            useEffect(() => {
              if (values.service) {
                const servicePrice = servicePrices[values.service] || 0;
                setFieldValue("price", servicePrice);
              }
            }, [values.service, values.hours, setFieldValue]);

            return (
              <Form className="grid grid-cols-1 gap-4">
                <Field name="fullName">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      label="Full Name"
                      error={touched.fullName && errors.fullName}
                      styles={{ input: { height: "45px" } }}
                    />
                  )}
                </Field>

                <Field name="phone">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      label="Phone Number"
                      error={touched.phone && errors.phone}
                      styles={{ input: { height: "45px" } }}
                    />
                  )}
                </Field>
                <Field name="email">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      label="Email"
                      error={touched.email && errors.email}
                      styles={{ input: { height: "45px" } }}
                    />
                  )}
                </Field>
                <Field name="service">
                  {({ field }) => (
                    <Select
                      {...field}
                      label="Select a Cleaning Service"
                      data={Object.keys(servicePrices).map((key) => ({
                        value: key,
                        label: key.replace(/\b\w/g, (c) => c.toUpperCase()),
                      }))}
                      placeholder="Choose a service"
                      error={touched.service && errors.service}
                      onChange={(value) => setFieldValue("service", value)}
                      styles={{ input: { height: "45px" } }}
                    />
                  )}
                </Field>
                <Field name="city">
                  {({ field }) => (
                    <Select
                      {...field}
                      label="Select Your City"
                      data={ukCities.map((city) => ({
                        value: city,
                        label: city,
                      }))}
                      placeholder="Choose your city"
                      error={touched.city && errors.city}
                      onChange={(value) => setFieldValue("city", value)}
                      styles={{ input: { height: "45px" } }}
                    />
                  )}
                </Field>
                <NumberInput
                  value={values.price}
                  label="Price per hour (£)"
                  readOnly
                  styles={{
                    input: {
                      height: "45px",
                      backgroundColor: "#f3f4f6",
                      cursor: "not-allowed",
                    },
                  }}
                />

                <Field name="address">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      label="Address"
                      placeholder="Enter your address"
                      error={touched.address && errors.address}
                      styles={{ input: { height: "45px" } }}
                    />
                  )}
                </Field>

                <Field name="notes">
                  {({ field }) => (
                    <Textarea
                      {...field}
                      label="Additional Notes (Optional)"
                      placeholder="Any special instructions?"
                      styles={{ input: { height: "45px" } }}
                    />
                  )}
                </Field>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-[#FFDA6C] cursor-pointer text-[#11365C] hover:bg-[#E6C255]  font-semibold py-3 rounded-full text-lg sm:text-xl transition duration-300 ease-in-out"
                >
                  Submit Booking
                </motion.button>
              </Form>
            );
          }}
        </Formik>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/30"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm animate-fadeIn scale-95">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-[#FFDA6C] rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-[#11365C] mt-4">
                Booking Successful!
              </h3>
              <p className="text-gray-700 mt-2">
                Your cleaning service has been booked successfully.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 w-full bg-[#FFDA6C] text-[#11365C] font-semibold py-2 rounded-full hover:bg-[#E6C255] transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Booking;
