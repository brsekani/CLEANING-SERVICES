import React from "react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

const services = [
  {
    title: "Residential Cleaning",
    desc: "Deep cleaning, housekeeping, and move-in/out cleaning.",
    icon: "🏡",
  },
  {
    title: "Office & Commercial Cleaning",
    desc: "Routine office cleaning, sanitization, and workspace maintenance.",
    icon: "🏢",
  },
  {
    title: "Post-Construction Cleaning",
    desc: "Debris removal, surface cleaning, and final touch-ups.",
    icon: "🚧",
  },
  {
    title: "Carpet & Upholstery Cleaning",
    desc: "Steam cleaning, stain removal, and sofa maintenance.",
    icon: "🛋️",
  },
  {
    title: "Window & Glass Cleaning",
    desc: "Interior & exterior washing, streak-free glass cleaning.",
    icon: "🪟",
  },
  {
    title: "Specialized Cleaning Services",
    desc: "Disinfection, AirBnB cleaning, and eco-friendly solutions.",
    icon: "✨",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="py-12 px-6 md:px-12 lg:px-28  bg-gray-100"
    >
      {/* Header */}
      <motion.p
        className="text-2xl sm:text-5xl font-bold text-center text-[#11365C] mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Most Popular services
      </motion.p>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            desc={service.desc}
            icon={service.icon}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
