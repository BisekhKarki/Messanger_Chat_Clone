"use client";

import ContextHook from "@/context/ContextHook";
import { fetchMessages } from "@/services/Message";
import { MessageProps } from "@/types/Types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  receiverId: string;
}

const ShowConversations: React.FC<Props> = ({ receiverId }) => {
  const { token } = ContextHook();
  const params = useParams();
  const [messages, setMessages] = useState<Array<MessageProps> | []>([]);

  const getMessages = async () => {
    const response = await fetchMessages(token, params.id as string);
    setMessages(response.message);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="h-[70vh] overflow-y-auto">
      <div className="flex overflow-y-auto flex-col gap-2 mt-5">
        {messages &&
          messages.length > 0 &&
          messages.map((m, k) => (
            <p
              className={`${
                m.receiverId !== receiverId
                  ? "bg-gray-200 text-black self-start text-left ml-4 rounded-2xl shadow-sm  cursor-pointer"
                  : "bg-blue-500 text-white self-end text-right mr-4 rounded-2xl shadow-sm cursor-pointer"
              } max-w-[60%] py-2   px-5`}
              key={k}
            >
              {m.message}
            </p>
          ))}
        <span
          className={`${
            messages.at(-1)?.receiverId !== receiverId
              ? "self-start ml-6 text-gray-400  -mt-2"
              : "self-end text-sm mr-6 text-gray-400 -mt-2"
          }`}
        >
          {messages &&
            messages.length > 0 &&
            formatDistanceToNow(new Date(messages.at(-1)?.createdAt || ""), {
              addSuffix: true,
            })}
        </span>
      </div>
    </div>
  );
};

export default ShowConversations;
