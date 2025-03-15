import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../assets/images/cleaning1.jpg";
import { Link } from "react-scroll";

const AboutUs = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-28 bg-gray-100" id="about">
      <div className="max-w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={aboutImage}
            alt="Cleaning Team at Work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#11365C] opacity-40"></div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-[#11365C] mb-4">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <strong>Duckland</strong>, a trusted cleaning service in
            the UK since <strong>2015</strong>. With over{" "}
            <strong>9 years of experience</strong>, we provide{" "}
            <strong>top-quality</strong>
            cleaning for homes and offices, ensuring every space shines.
          </p>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            We use <strong>eco-friendly products</strong> and proven techniques
            to deliver spotless results. Whether it’s{" "}
            <strong>
              deep cleaning, regular maintenance, or end-of-tenancy services
            </strong>
            , our expert team guarantees a fresh, hygienic space.
          </p>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Choose <strong>Duckland</strong> for reliable, professional
            cleaning. Let us handle the mess while you enjoy a cleaner,
            healthier environment!
          </p>

          <Link to="services" smooth={true} duration={500}>
            <button className="mt-6 bg-[#FFDA6C] text-[#11365C] px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#E6C255] transition-all duration-300">
              Explore Services
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
