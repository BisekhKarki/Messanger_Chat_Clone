"use client";

import React from "react";
import user from "@/public/User.jpg";
import Image from "next/image";
import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import UserInfo from "@/components/UserInfo";
import ContextHook from "@/context/ContextHook";

const Page = () => {
  const { showInfo, setShowInfo } = ContextHook();

  return (
    <div className="w-full">
      <div className="flex w-full ">
        <div
          className={`${
            showInfo
              ? "w-[75%] border-r-1  border-gray-300 h-[90vh]"
              : "w-[100%]"
          }`}
        >
          <div className="flex items-center justify-between border-b-1 border-gray-300 shadow-sm sticky ">
            <div className="flex items-center px-3">
              <Image
                src={user}
                alt="user"
                className=""
                width={60}
                height={60}
              />
              <div>
                <p className="text-sm font-bold">Bisekh Karki</p>
                <p className="text-sm text-gray-500">Active 1h ago</p>
              </div>
            </div>
            <div className="flex gap-3 mr-5 items-center">
              <MdCall className="text-blue-400 text-xl cursor-pointer" />
              <FaVideo className="text-blue-400 text-xl cursor-pointer" />
              <FcInfo
                className="text-blue-400 text-xl cursor-pointer"
                onClick={() => setShowInfo(!showInfo)}
              />
            </div>
          </div>
        </div>
        {showInfo && <UserInfo />}
      </div>
    </div>
  );
};

export default Page;
