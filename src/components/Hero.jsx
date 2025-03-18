import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Array of background images for the slider
const images = [
  "/src/assets/images/backgroundImageHero.jpg",
  "/src/assets/images/cleanerHero.PNG",
  "/src/assets/images/cleaning1.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative min-h-screen flex justify-center items-center text-center px-6 md:px-12 lg:px-28  bg-cover bg-center overflow-hidden bg-[#11365C]'>
      {/* Background Image Animation */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-[#11365C] opacity-75'></div>

      {/* Content Wrapper */}
      <div className='relative z-10 flex flex-row w-full max-w-full gap-10 mx-auto items-center text-white'>
        {/* Text Content */}
        <div className='w-full lg:w-1/2 text-left relative top-10'>
          <p className='uppercase text-sm sm:text-base tracking-wide text-gray-300'>
            Affordable for everyone
          </p>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-[45px] font-extrabold leading-tight capitalize'>
            Elevate Your Space with Expert Cleaning
          </h2>
          <p className='mt-4 sm:mt-6 text-lg sm:text-xl text-gray-200 leading-relaxed lg:text-[16px]'>
            A spotless home isn’t just about looks—it’s about comfort, health,
            and peace of mind. Our dedicated team ensures every corner shines,
            whether it’s a deep clean or routine maintenance. Let us handle the
            mess while you enjoy a fresher, healthier living space.
          </p>
          <Link to='/booking'>
            <button className='mt-6 sm:mt-8 bg-[#FFDA6C] cursor-pointer text-[#11365C] w-[180px] h-[50px] sm:w-[200px] sm:h-[55px] rounded-full text-lg sm:text-xl font-semibold shadow-xl hover:bg-[#E6C255] transition-all duration-300'>
              Book Now
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className='lg:flex hidden justify-center w-full lg:w-1/2'>
          <img
            src='/src/assets/images/cleanerHero.PNG'
            alt='Cleaning Professional'
            className='w-full max-w-[600px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] h-screen object-cover'
          />
        </div>
      </div>
    </div>
  );
}
