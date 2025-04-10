"use client";

import React from "react";

const NavbarDropDown = () => {
  return (
    <div className="absolute z-10 right-3 top-10 bg-white border border-gray-300 rounded-md w-40">
      <div className="flex flex-col items-start">
        <p className="hover:bg-gray-400 w-full px-3 cursor-pointer py-2">
          My Profile
        </p>
        <hr className=" text-black" />
        <p className="hover:bg-gray-400 w-full px-3 cursor-pointer py-2">
          Logout
        </p>
      </div>
    </div>
  );
};

export default NavbarDropDown;
