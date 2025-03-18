import React, { useEffect } from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import Services from "../components/Services";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import { scroller } from "react-scroll";

const Home = () => {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");

    if (scrollTo) {
      setTimeout(() => {
        // Ensure DOM is ready before scrolling
        scroller.scrollTo(scrollTo, {
          smooth: true,
          duration: 500,
          offset: -50,
        });
      }, 100); // Short delay ensures React renders everything first
    }
  }, []); // ✅ Re-run when URL query changes

  return (
    <section className='bg-gray-100 h-full w-full'>
      <Hero />
      <AboutUs />
      <Services />
      <Contact />
    </section>
  );
};

export default Home;
