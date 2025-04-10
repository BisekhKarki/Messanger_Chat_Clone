"use client";

import React from "react";
import { IoIosSearch } from "react-icons/io";
import { PiDotsThreeOutline } from "react-icons/pi";
import AllUser from "./AllUser";

const Sidebar = () => {
  return (
    <aside className=" w-[30%] h-[90vh] border-r border-gray-300 overflow-y-auto">
      <div className="border-b-1 border-gray-300 pb-2  sticky top-0 z-10 bg-white shadow">
        <div className="flex items-center justify-between px-5 py-2">
          <h1 className="font-bold text-2xl">Chats</h1>
          <PiDotsThreeOutline className="bg-gray-200  text-black rounded-full px-1 text-2xl hover:bg-gray-300 cursor-pointer transition" />
        </div>
        <div className="flex justify-center mt-2">
          <div className="relative">
            <input
              placeholder="Search Message"
              className="border border-gray-300 rounded-sm px-6"
            />
            <IoIosSearch className="absolute top-0.5 left-0.5 text-xl" />
          </div>
        </div>
      </div>
      <AllUser />
    </aside>
  );
};

export default Sidebar;
