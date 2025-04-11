"use client";

import React, { useEffect, useState } from "react";

import UserInfo from "@/components/UserInfo";
import ContextHook from "@/context/ContextHook";
import { IoSend } from "react-icons/io5";
import UserMessageDisplay from "./Messages/UserMessageDisplay";
import { fetchUserDetails } from "@/services/Conversation";
import { useParams } from "next/navigation";
import { User } from "@/types/Types";
import { sendMessage } from "@/services/Message";
import toast from "react-hot-toast";
import ShowConversations from "./Messages/ShowConversations";

const DisplayMessage = () => {
  const { showInfo, token } = ContextHook();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [userMessage, setUserMessage] = useState<string>("");

  const details = async () => {
    const response = await fetchUserDetails(token, params.id as string);
    if (response.success) {
      setUser(response.message);
    }
  };

  useEffect(() => {
    details();
  }, []);

  const sendMessageToUser = async () => {
    if (!user) return;
    if (userMessage.length === 0) toast.error("Enter a message");
    const values = {
      conversationId: params.id as string,
      receiverId: user._id as string,
      message: userMessage,
    };
    const response = await sendMessage(token, values);
    toast.success(response?.message as string);
    setUserMessage("");
  };

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
          <UserMessageDisplay userDetails={user} />
          <ShowConversations receiverId={user?._id as string} />
          <div className="p-2 border-t border-gray-300  relative">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
              value={userMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserMessage(e.target.value)
              }
            />
            <IoSend
              className="absolute top-5 right-4 text-2xl text-blue-600"
              onClick={() => sendMessageToUser()}
            />
          </div>
        </div>
        {showInfo && <UserInfo userDetails={user} />}
      </div>
    </div>
  );
};

export default DisplayMessage;
