"use client";

import useCustomContext from "@/context/ContextHook";
import { deleteMessage } from "@/services/Message";
import { MessageProps } from "@/types/Types";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiTrash } from "react-icons/bi";

interface Props {
  showMenu: boolean;
  setShowSetting: (value: boolean) => void;
  messageId: string;
  messageType: string;
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  setUserMessage: (value: string) => void;
  message?: string;
  setEditMessageId: (value: string) => void;
  setEdit: (value: boolean) => void;
}

const MessageSettings = ({
  showMenu,
  setShowSetting,
  messageId,
  messageType,
  setMessages,
  setUserMessage,
  message,
  setEditMessageId,
  setEdit,
}: Props) => {
  const { token } = useCustomContext();

  const deleteMessageFromConversation = async () => {
    console.log(messageId);
    const response = await deleteMessage(token, messageId);
    if (response?.success) {
      toast.success(response.message);

      setMessages((prev: MessageProps[]) =>
        prev.filter((p) => p._id !== messageId)
      );
    } else {
      toast.error(response?.message as string);
    }
    setShowSetting(false);
  };

  return (
    <div
      className={`absolute  ${
        messageType === "Image" ? "-top-1 -left-24" : "  -top-17 -left-29"
      }    bg-white z-[1000] border border-gray-200 shadow-2xs `}
    >
      <div className="space-y-2 px-5 py-2">
        <div
          className="flex gap-2 items-center justify-center cursor-pointer"
          onClick={() => deleteMessageFromConversation()}
        >
          <BiTrash size={20} className="text-red-500" />
          <p className="text-black">Delete</p>
        </div>
        {showMenu && messageType === "Text" && (
          <>
            <hr className="w-full" />
            <div
              className="flex gap-2 items-center justify-center  cursor-pointer"
              onClick={() => {
                if (message) {
                  setUserMessage(message);
                  setEditMessageId(messageId);
                  setEdit(true);
                }
              }}
            >
              <BiEdit size={20} className="text-green-600" />
              <p className="text-black">Edit</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageSettings;
