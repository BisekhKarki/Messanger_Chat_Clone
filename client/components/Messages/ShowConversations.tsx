"use client";

import { MessageProps } from "@/types/Types";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { socket } from "@/constants/baseurl";
import Image from "next/image";
import ShowImageFull from "./ShowImageFull";
import { BsThreeDots } from "react-icons/bs";
import MessageSettings from "./MessageSettings";

interface Props {
  receiverId: string;
  messages: Array<MessageProps>;
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  setUserMessage: (value: string) => void;
  setEditMessageId: (value: string) => void;
  setEdit: (value: boolean) => void;
}

const ShowConversations: React.FC<Props> = ({
  receiverId,
  messages,
  setMessages,
  setUserMessage,
  setEditMessageId,
  setEdit,
}) => {
  const [lastMessage, setLastMessage] = useState<MessageProps | null>(null);
  const [showFullImage, setShowFullImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [messageId, setMessageId] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    setLastMessage(messages.at(-1) || null);
  }, [messages]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      if (
        lastMessage &&
        !lastMessage.read &&
        lastMessage?.receiverId === receiverId
      )
        socket.emit("message_read", lastMessage._id);
      socket.on("read_message", (data) => {
        setMessages((prev: MessageProps[]) =>
          prev.map((m) => (m._id === data._id ? data : m))
        );
      });
    }

    return () => {
      socket.off("read_message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, setMessages]);

  // const optimizeCloudinaryUrl = (url: string) => {
  //   if (!url.includes("res.cloudinary.com")) return url;
  //   return url.replace(/upload\//, "upload/q_auto:low,f_auto,w_600/");
  // };

  return (
    <div className="h-[70vh] overflow-y-auto ">
      <div className="flex overflow-y-auto flex-col gap-2 mt-5 mb-8">
        <div className="">
          <div
            className={`fixed inset-0 z-50 transition-all duration-200 ease-in-out ${
              showFullImage
                ? " opacity-100 visible backdrop-blur-sm "
                : "opacity-0 invisible"
            }`}
          >
            {showFullImage && imageUrl && (
              <ShowImageFull
                imageSrc={imageUrl}
                setShowFullImage={setShowFullImage}
              />
            )}
          </div>
        </div>

        {messages &&
          messages.length > 0 &&
          messages.map((m, k) =>
            m.messageType === "Image" ? (
              <div
                key={k}
                className={`${
                  m.receiverId !== receiverId ? " self-start " : " self-end "
                } relative`}
                onMouseEnter={() => {
                  setShowSettings(true);
                  setMessageId(m._id as string);
                }}
                onMouseLeave={() => {
                  setShowSettings(false);
                  setMessageId("");
                  setShowMenu(false);
                }}
              >
                <Image
                  src={m.message as string}
                  width={300}
                  height={300}
                  unoptimized
                  className={`max-w-[60%] py-2 cursor-pointer  px-5 `}
                  alt="image"
                  onClick={() => {
                    console.log(m.message);
                    setImageUrl(m.message as string);
                    setShowFullImage(true);
                  }}
                />
                {showSettings &&
                  m._id === messageId &&
                  m.senderId !== receiverId && (
                    <div
                      className="absolute top-8 -left-3 rounded-full p-1 bg-black/90 hover:cursor-pointer"
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <BsThreeDots size={13} className="text-white" />
                    </div>
                  )}
                {showMenu &&
                  m._id === messageId &&
                  m.senderId !== receiverId && (
                    <MessageSettings
                      showMenu={showMenu}
                      setShowSetting={setShowSettings}
                      messageId={m._id as string}
                      messageType={"Image"}
                      setMessages={setMessages}
                      setUserMessage={setUserMessage}
                      setEditMessageId={setEditMessageId}
                      setEdit={setEdit}
                    />
                  )}
              </div>
            ) : (
              <div
                key={k}
                onMouseEnter={() => {
                  setShowSettings(true);
                  setMessageId(m._id as string);
                  console.log(messageId);
                }}
                onMouseLeave={() => {
                  setShowSettings(false);
                  setMessageId("");
                  setShowMenu(false);
                }}
                className={`${
                  m.receiverId !== receiverId && m.messageType !== "Image"
                    ? "bg-gray-200 text-black self-start text-left ml-4 rounded-2xl shadow-sm  cursor-pointer"
                    : "bg-blue-500 text-white self-end text-right mr-4 rounded-2xl shadow-sm cursor-pointer"
                } max-w-[60%] py-2   px-5 relative`}
              >
                <p>{m.message}</p>
                {showSettings &&
                  m._id === messageId &&
                  m.senderId !== receiverId && (
                    <div
                      className="absolute top-3 -left-5 rounded-full p-1 bg-black/90 hover:cursor-pointer"
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <BsThreeDots size={13} className="text-white" />
                    </div>
                  )}
                {showMenu &&
                  m._id === messageId &&
                  m.senderId !== receiverId && (
                    <MessageSettings
                      showMenu={showMenu}
                      setShowSetting={setShowSettings}
                      messageId={m._id as string}
                      messageType="Text"
                      setMessages={setMessages}
                      setUserMessage={setUserMessage}
                      message={m.message as string}
                      setEditMessageId={setEditMessageId}
                      setEdit={setEdit}
                    />
                  )}
              </div>
            )
          )}

        {lastMessage && lastMessage.senderId !== receiverId && (
          <span
            className={`${
              messages.at(-1)?.receiverId !== receiverId
                ? "self-start ml-6 text-gray-400  -mt-2"
                : "self-end text-sm mr-6 text-gray-400 -mt-2"
            }`}
          >
            <span className="mr-1">
              {lastMessage.receiverId === receiverId && lastMessage.read
                ? "Seen"
                : "Sent"}
            </span>
            {messages &&
              messages.length > 0 &&
              formatDistanceToNow(
                new Date(
                  (lastMessage.read
                    ? messages.at(-1)?.updatedAt
                    : messages.at(-1)?.createdAt) || ""
                ),
                {
                  addSuffix: true,
                }
              )}
          </span>
        )}
      </div>
    </div>
  );
};

export default ShowConversations;
