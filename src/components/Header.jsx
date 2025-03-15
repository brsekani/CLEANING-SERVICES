import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link as ScrollLink, scroller } from "react-scroll"; // For smooth scrolling
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom"; // For navigation

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "About", href: "about", type: "scroll" },
    { name: "Services", href: "services", type: "scroll" },
    { name: "Contact", href: "contact", type: "scroll" },
    { name: "Reviews", href: "reviews", type: "route" },
    { name: "Admin", href: "/admin", type: "route" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleScrollOrNavigate = (item) => {
    if (item.type === "scroll") {
      if (isHome) {
        scroller.scrollTo(item.href, {
          smooth: true,
          duration: 500,
          offset: -50,
        });
      } else {
        navigate(`/?scrollTo=${item.href}`, { replace: true });
      }
    } else {
      navigate(item.href);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="px-6 md:px-12 lg:px-28 py-4 flex justify-between items-center">
        <RouterLink to="/" className="text-2xl font-bold text-[#11365C]">
          DUCKLAND
        </RouterLink>

        <nav className="hidden md:flex gap-8 items-center">
          <nav className="hidden md:flex gap-8 items-center">
            {links.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollOrNavigate(item)}
                className="text-lg font-medium text-[#11365C] hover:text-[#FFDA6C] transition cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </nav>

        <div className="flex items-center gap-4">
          <RouterLink to="/tracking" className="hidden sm:block">
            <button className="bg-[#FFDA6C] text-[#11365C] px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#E6C255] transition-all duration-300">
              Track Now
            </button>
          </RouterLink>
          <RouterLink to="/booking" className="hidden sm:block">
            <button className="bg-[#FFDA6C] text-[#11365C] px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#E6C255] transition-all duration-300">
              Book Now
            </button>
          </RouterLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={mobileMenuOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 text-lg font-medium shadow-lg">
          {/* Close Icon */}
          <button
            className="absolute top-6 right-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IconX size={32} className="text-gray-700 hover:text-gray-900" />
          </button>

          {links.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handleScrollOrNavigate(item), setMobileMenuOpen(false);
              }}
              className="text-lg font-medium text-[#11365C] hover:text-[#FFDA6C] transition cursor-pointer"
            >
              {item.name}
            </button>
          ))}

          <div className="flex items-center gap-4">
            <RouterLink to="/tracking">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#FFDA6C] text-[#11365C] px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#E6C255] transition-all duration-300"
              >
                Track Now
              </button>
            </RouterLink>
            <RouterLink to="/booking">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#FFDA6C] text-[#11365C] px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#E6C255] transition-all duration-300"
              >
                Book Now
              </button>
            </RouterLink>
          </div>
        </div>
      </Transition>
    </header>
  );
}
