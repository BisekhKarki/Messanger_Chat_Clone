"use client";

import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import UserMessageDisplay from "./Messages/UserMessageDisplay";
import ShowConversations from "./Messages/ShowConversations";
import { fetchUserDetails } from "@/services/Conversation";
import { editMessage, fetchMessages } from "@/services/Message";
import { getSingleUser } from "@/services/singleUser";
import useCustomContext from "@/context/ContextHook";
import toast from "react-hot-toast";
import { socket } from "@/constants/baseurl";
import { useParams } from "next/navigation";
import { User, MessageProps } from "@/types/Types";
import UserInfo from "./UserInfo";
import { FaFileImage } from "react-icons/fa";
import ImageInput from "./ImageInput";
import { BsSendPlusFill } from "react-icons/bs";

const DisplayMessage = () => {
  const { showInfo, token, setChangeMessage } = useCustomContext();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [userMessage, setUserMessage] = useState<string>("");
  const [senderId, setSenderId] = useState<User | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const [editMessageId, setEditMessageId] = useState<string>("");
  const [edit, setEdit] = useState(false);

  const [messages, setMessages] = useState<Array<MessageProps> | []>([]);

  // Fetch user and sender details
  const details = async () => {
    if (!token) return;
    const response = await fetchUserDetails(token, params.id as string);
    if (response.success) {
      setUser(response.message);
    }
    const getUser = await getSingleUser(token);
    if (getUser?.success) {
      setSenderId(getUser.message);
    }
  };

  useEffect(() => {
    const newDate = new Date();
    setDate(newDate); // Set date only on client side
    details();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send message to user
  const sendMessageToUser = async () => {
    if (!user) return;
    if (userMessage.trim().length === 0) {
      toast.error("Enter a message");
      return;
    }

    try {
      setChangeMessage(true);

      const data = {
        conversationId: params.id,
        senderId: senderId?._id,
        receiverId: user?._id,
        message: userMessage,
        createdAt: date,
        updatedAt: date,
        read: false,
      };

      // Emit message via socket
      socket.emit("send_message", data);

      // Add slight delay to ensure message persistence
      await new Promise((resolve) => setTimeout(resolve, 100));
    } finally {
      setChangeMessage(false);
      setUserMessage("");
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message"); // Clean up on component unmount
    };
  }, []);

  // Fetch previous messages for the conversation
  const getMessages = async () => {
    if (!token) return;
    const response = await fetchMessages(token, params.id as string);
    setMessages(response.message);
  };

  useEffect(() => {
    getMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editUserMessage = async () => {
    const response = await editMessage(token, editMessageId, userMessage);
    if (response?.success) {
      setUserMessage("");
      setEdit(false);
      const newMessage = messages.map((p) =>
        p._id === editMessageId
          ? { ...p, message: userMessage, updatedAt: new Date() }
          : p
      );

      setMessages(newMessage);
      toast.success(response.message);
    }
  };

  // console.log(senderId);

  return (
    <div className="w-full">
      <div className="flex w-full relative ">
        <div
          className={`${
            showInfo
              ? "max-2xl:w-[75%] max-xl:w-[73%] max-lg:w-[65%] max-md:w-[68%] max-sm:w-[100%] relative  border-r-1  border-gray-300 h-[90vh] "
              : "w-[100%]"
          }`}
        >
          <UserMessageDisplay
            userDetails={user}

            // senderId={senderId?._id as string}
          />
          <div className="overflow-y-auto">
            <ShowConversations
              senderId={senderId?._id as string}
              setUserMessage={setUserMessage}
              messages={messages}
              receiverId={user?._id as string}
              setMessages={setMessages}
              setEditMessageId={setEditMessageId}
              setEdit={setEdit}
            />
          </div>
          <div className="p-2 border-t border-gray-300 flex items-center space-x-5">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
              value={userMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserMessage(e.target.value)
              }
            />
            {uploadImage && (
              <ImageInput
                setUploadImage={setUploadImage}
                token={token}
                receiver={user?._id}
                setMessage={setMessages}
              />
            )}
            <div className="flex space-x-5 mr-2">
              <FaFileImage
                onClick={() => setUploadImage(true)}
                className=" text-2xl text-blue-600"
              />

              {edit ? (
                <BsSendPlusFill
                  className=" text-2xl text-blue-600"
                  onClick={() => editUserMessage()}
                />
              ) : (
                <IoSend
                  className=" text-2xl text-blue-600"
                  onClick={() => sendMessageToUser()}
                />
              )}
            </div>
          </div>
        </div>
        {showInfo && <UserInfo userDetails={user} />}
      </div>
    </div>
  );
};

export default DisplayMessage;
