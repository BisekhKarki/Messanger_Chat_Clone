"use client";

import { MessageProps } from "@/types/Types";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { socket } from "@/constants/baseurl";
import Image from "next/image";
import ShowImageFull from "./ShowImageFull";

interface Props {
  receiverId: string;
  messages: Array<MessageProps>;
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
}

const ShowConversations: React.FC<Props> = ({
  receiverId,
  messages,
  setMessages,
}) => {
  const [lastMessage, setLastMessage] = useState<MessageProps | null>(null);
  const [showFullImage, setShowFullImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

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
              <Image
                src={m.message as string}
                width={300}
                height={300}
                unoptimized
                className={`${
                  m.receiverId !== receiverId ? " self-start " : " self-end "
                } max-w-[60%] py-2 cursor-pointer  px-5`}
                key={k}
                alt="image"
                onClick={() => {
                  console.log(m.message);
                  setImageUrl(m.message as string);
                  setShowFullImage(true);
                }}
              />
            ) : (
              <p
                className={`${
                  m.receiverId !== receiverId && m.messageType !== "Image"
                    ? "bg-gray-200 text-black self-start text-left ml-4 rounded-2xl shadow-sm  cursor-pointer"
                    : "bg-blue-500 text-white self-end text-right mr-4 rounded-2xl shadow-sm cursor-pointer"
                } max-w-[60%] py-2   px-5`}
                key={k}
              >
                {m.message}
              </p>
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
