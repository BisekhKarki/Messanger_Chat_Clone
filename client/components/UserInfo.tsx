"use client";
import React from "react";
import userImage from "@/public/User.jpg";
import Image from "next/image";
import { User } from "@/types/Types";

interface UserInfroProps {
  userDetails: User | null;
}

const UserInfo = ({ userDetails }: UserInfroProps) => {
  return (
    <div className="w-[25%]">
      <div className="flex justify-center items-center">
        <div>
          {userDetails?.image ? (
            <Image
              src={userDetails.image}
              alt="user"
              className=""
              width={60}
              height={60}
            />
          ) : (
            <Image
              src={userImage}
              alt="user"
              className="ml-10"
              width={60}
              height={60}
            />
          )}
          <div>
            <p className="font-bold text-xl text-center ">
              {userDetails?.name}
            </p>
            <p className="text-sm text-gray-500 text-center">Active 1h ago</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
