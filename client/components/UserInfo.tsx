"use client";
import React from "react";
import User from "@/public/User.jpg";
import Image from "next/image";

const UserInfo = () => {
  return (
    <div className="w-[25%]">
      <div className="flex justify-center">
        <div>
          <Image src={User} width={100} height={100} alt="user" />
          <div>
            <p className="font-bold text-xl text-center ">Bisekh Karki</p>
            <p className="text-sm text-gray-500 text-center">Active 1h ago</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
