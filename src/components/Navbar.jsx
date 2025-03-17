import React, { useState } from "react";
import links from "../utils/sidebarLinks";
import { useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [profileToggle, setProfileToggle] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const exactPath = path.split("/")[1];

  const curPage = links.find((curPath) => curPath.path === `/${exactPath}`);

  return (
    <section className="w-full flex justify-between items-center py-8 px-4 h-[107px] shadow-custom-light">
      <div className="text-[18px] leading-[21.94px] font-medium font-montserrat">
        {curPage?.name}
      </div>
      <div
        onClick={() => setProfileToggle((prev) => !prev)}
        className="relative flex items-center gap-2 cursor-pointer"
      >
        <img
          src="/src/assets/sidebar/profileImg.jfif"
          alt="profileImg"
          className="w-[32px] h-[32px] rounded-full border-2 border-primary "
        />
        <span>Profile</span>
        <IoIosArrowDown
          className={`duration-700 ${profileToggle ? "rotate-180" : ""}`}
        />
        <button
          className={`absolute z-10 w-[145px] h-[100px]  rounded-md bg-[#FBFADB] flex flex-col items-center justify-center gap-3 text-sm duration-700 ${
            profileToggle ? " top-10 right-0" : "-top-36 right-0"
          } `}
        >
          <div>Settings</div>
          <div>Notifications</div>
        </button>
      </div>
    </section>
  );
};

export default Navbar;
