import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll"; // For smooth scrolling
import { Link as RouterLink } from "react-router-dom"; // For page navigation

const Footer = () => {
  return (
    <footer className="bg-[#11365C] text-white py-10">
      <div className="px-6 md:px-12 lg:px-28 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo & Description */}
        <div>
          <RouterLink to="/" className="text-2xl font-bold text-[#FFDA6C]">
            DUCKLAND
          </RouterLink>
          <p className="mt-3 text-gray-300">
            Providing top-notch cleaning services for homes & businesses. Your
            space, our priority!
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFDA6C]">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <RouterLink
                to="/"
                className="hover:text-[#FFDA6C] transition cursor-pointer"
              >
                Home
              </RouterLink>
            </li>
            <li>
              <ScrollLink
                to="services"
                smooth={true}
                duration={500}
                className="hover:text-[#FFDA6C] transition cursor-pointer"
              >
                Services
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="hover:text-[#FFDA6C] transition cursor-pointer"
              >
                About Us
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="hover:text-[#FFDA6C] transition cursor-pointer"
              >
                Contact
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* Contact Info & Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFDA6C]">Contact Us</h3>
          <p className="mt-3">Email: support@cleanpro.com</p>
          <p>Phone: +123 456 789</p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a
              href="#"
              className="text-gray-300 hover:text-[#FFDA6C] transition text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#FFDA6C] transition text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#FFDA6C] transition text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#FFDA6C] transition text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CleanPro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
