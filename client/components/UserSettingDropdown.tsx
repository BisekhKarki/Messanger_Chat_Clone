"use client";

import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { FaVideo } from "react-icons/fa";
import { MdCall, MdOutlineMarkEmailUnread } from "react-icons/md";
import { PiDotsThreeOutline } from "react-icons/pi";
import { RiUserForbidLine } from "react-icons/ri";

const UserSettingDropdown = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  return (
    <div className="relative">
      <PiDotsThreeOutline
        className="bg-black  text-white rounded-full px-1 text-2xl  cursor-pointer transition"
        onClick={() => setShowDropDown(!showDropDown)}
      />
      {showDropDown && (
        <div className="absolute -right-1 bg-white w-64 border border-gray-300 rounded-md px-5 py-2 z-10">
          <div className="border-b-2 border-gray-300 py-2 mb-2">
            <p className="flex items-center gap-2">
              <MdOutlineMarkEmailUnread />
              Mark as unread
            </p>
            <p className="flex items-center gap-2">
              <CiBellOn className="text-xl" />
              Mute Notification
            </p>
          </div>

          <div className="border-b-2 border-gray-300 py-2 mb-2">
            <p className="flex items-center gap-2">
              <MdCall className=" cursor-pointer" />
              Audio Call
            </p>
            <p className="flex items-center gap-2">
              <FaVideo className="cursor-pointer" />
              Video Call
            </p>
          </div>

          <div className="py-2">
            <p className="flex items-center gap-2">
              <RiUserForbidLine />
              Block User
            </p>
            <p className="flex items-center gap-2">
              <BiTrash /> Delete Chat
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettingDropdown;
