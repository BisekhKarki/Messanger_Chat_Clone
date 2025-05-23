"use client";

import ContextHook from "@/context/ContextHook";
import Image from "next/image";
import React, { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { MdCall } from "react-icons/md";

import user from "@/public/User.jpg";
import { User } from "@/types/Types";

import CallPopup from "../Call/CallPopup";

interface userDetailsProps {
  userDetails: User | null;

  // senderId: string;
}

const UserMessageDisplay = ({ userDetails }: userDetailsProps) => {
  const { showInfo, setShowInfo } = ContextHook();
  const [showPop, setShowPop] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between border-b-1 border-gray-300 shadow-sm sticky top-0 z-10 bg-white ">
      <div className="flex items-center px-3">
        {userDetails?.image ? (
          <Image
            src={userDetails.image}
            alt="user"
            className=""
            width={60}
            height={60}
          />
        ) : (
          <Image src={user} alt="user" className="" width={60} height={60} />
        )}
        <div>
          <p className="text-sm font-bold">{userDetails?.name}</p>
          <p className="text-sm text-gray-500">Active 1h ago</p>
        </div>
      </div>
      <div className="flex gap-3 mr-5 items-center">
        {showPop && (
          <CallPopup id={userDetails?._id as string} setShowPop={setShowPop} />
        )}
        <MdCall
          className="text-blue-400 text-xl cursor-pointer"
          onClick={() => {
            // setShowPop(true);
            console.log(showPop);
          }}
        />
        <FaVideo className="text-blue-400 text-xl cursor-pointer" />
        <FcInfo
          className="text-blue-400 text-xl cursor-pointer"
          onClick={() => setShowInfo(!showInfo)}
        />
      </div>
    </div>
  );
};

export default UserMessageDisplay;
