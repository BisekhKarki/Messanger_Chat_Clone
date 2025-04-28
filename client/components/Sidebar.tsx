"use client";

import React, { useState } from "react";
// import { IoIosSearch } from "react-icons/io";
import AllUser from "./AllUser";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 md:hidden bg-blue-500 text-white p-3 rounded-full shadow-lg z-20"
        aria-label="button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <aside
        className={`fixed md:relative inset-y-0 left-0 w-64 md:w-[30%] lg:w-[25%] h-screen md:h-[90vh] border-r border-gray-300
          overflow-y-auto bg-white z-30 transition-all duration-300 ease-in-out
           ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
      >
        {/* For mobile */}
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <h1 className="font-bold text-xl">Chats</h1>
          <FiX className="cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>

        <div className="hidden md:block border-b border-gray-300 pb-2 sticky top-0 z-10 bg-white shadow">
          <div className="flex items-center justify-between px-5 py-2">
            <h1 className="font-bold text-2xl">Chats</h1>
          </div>
          <div className="flex justify-center mt-2">
            <div className="relativ w-full max-w-xs">
              <input
                placeholder="Search Message"
                className="w-full border border-gray-300 rounded-sm px-4 py-1 text-sm md:text-base"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* For mobile */}
        <div className="md:hidden p-4 border-b">
          <div className="relative w-full">
            <input
              placeholder="Search Message"
              className="w-full border border-gray-300 rounded-sm px-4 py-1"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <AllUser searchValue={searchValue} />
      </aside>

      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-20" />}
    </>
  );
};

export default Sidebar;
