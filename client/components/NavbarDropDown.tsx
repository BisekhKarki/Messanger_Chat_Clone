"use client";

import { useRouter } from "next/navigation";
import React from "react";

const NavbarDropDown = () => {
  const router = useRouter();
  return (
    <div className="absolute right-3 z-50 top-10 bg-white border border-gray-300 rounded-md w-40">
      <div className="flex flex-col items-start">
        <p className="hover:bg-gray-400 w-full px-3 cursor-pointer py-2">
          My Profile
        </p>
        <hr className=" text-black" />
        <p
          className="hover:bg-gray-400 w-full px-3 cursor-pointer py-2"
          onClick={() => {
            localStorage.removeItem("Token");
            router.push("/login");
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default NavbarDropDown;
