"use client";

import { socket } from "@/constants/baseurl";
import useCustomContext from "@/context/ContextHook";
import { lastMessage } from "@/services/Message";
import { MessageProps } from "@/types/Types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id: string;
}

const LastMessage = ({ id }: Props) => {
  const { token, user, changeMessage } = useCustomContext();
  const [messageValue, setMessage] = useState<MessageProps[]>([]);

  useEffect(() => {
    const fetchLastMessage = async () => {
      try {
        const response = await lastMessage(token, id);
        if (response?.success) {
          setMessage(response.message);
        }
      } catch (error: unknown) {
        toast.error(String(error));
      }
    };

    fetchLastMessage();

    socket.on("new_message", () => {
      fetchLastMessage();
    });

    return () => {
      socket.off("new_message");
    };

    // if (changeMessage) {
    //   fetchLastMessage();
    // }
  }, [token, id, changeMessage]);

  const last = messageValue.at(-1);
  if (!last) return null;
  const isCurrentUser = last.senderId === user?._id;

  return (
    <div>
      {messageValue &&
      messageValue.length > 0 &&
      last?.messageType === "Image" ? (
        isCurrentUser ? (
          <p>You: Sent an image</p>
        ) : (
          <p className="font-bold">Sent an image</p>
        )
      ) : isCurrentUser ? (
        <p>You: {last?.message}</p>
      ) : (
        <p className="font-bold">{last?.message}</p>
      )}
    </div>
  );
};

export default LastMessage;
