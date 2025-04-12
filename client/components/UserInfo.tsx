"use client";
import React from "react";
import userImage from "@/public/User.jpg";
import Image from "next/image";
import { User } from "@/types/Types";
import { useParams, useRouter } from "next/navigation";
import { deleteConvo } from "@/services/Conversation";
import ContextHook from "@/context/ContextHook";

interface UserInfroProps {
  userDetails: User | null;
}

const UserInfo = ({ userDetails }: UserInfroProps) => {
  const params = useParams();
  const { token } = ContextHook();
  const router = useRouter();

  const deleteConversation = async () => {
    const response = await deleteConvo(token, params.id as string);
    if (response?.success) {
      router.push("/");
    }
  };

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
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="bg-red-500 text-white mt-5 px-10 py-1 rounded-md"
          onClick={() => deleteConversation()}
        >
          Delete conversation
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
