import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, desc, icon }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 text-center flex flex-col items-center justify-between border border-gray-200 hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Icon */}
      <div className="text-5xl mb-4">{icon}</div>

      <div>
        {/* Title */}
        <h3 className="text-2xl font-semibold text-[#11365C]">{title}</h3>

        {/* Description */}
        <p className="mt-2 text-gray-600">{desc}</p>
      </div>

      {/* Button */}
      <Link
        to={`/booking?service=${encodeURIComponent(title)}`}
        className="mt-4 bg-[#FFDA6C] text-[#11365C] px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#E6C255] transition-all duration-300"
      >
        Book Now
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
