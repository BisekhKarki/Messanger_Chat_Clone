"use client";

import { sendImages } from "@/services/Message";
import { MessageProps } from "@/types/Types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  setUploadImage: (value: boolean) => void;
  token: string;
  receiver: string | undefined;
  setMessage: (
    value: MessageProps[] | ((prev: MessageProps[]) => MessageProps[])
  ) => void;
}

const ImageInput = ({ setUploadImage, token, receiver, setMessage }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const params = useParams();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      //  setImageUrl(file)
    }
  };

  const uploadAImage = async () => {
    // console.log(selectedFile);
    if (!selectedFile) {
      toast.error("please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("conversationId", params.id as string);
      formData.append("receiverId", receiver as string);
      const response = await sendImages(token, formData);
      console.log(response?.newConversation);
      if (response?.newConversation) {
        const newConversation = response.newConversation;
        setMessage((prev) => [...prev, newConversation]);
      }
      setUploadImage(false);
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  return (
    <div className="fixed  inset-0  bg-black/90 opacity-90 z-50 backdrop-blur-sm w-full overflow-hidden flex items-center justify-center">
      <div className="bg-white px-10 py-10 z-10 rounded-xl shadow-lg flex flex-col items-center space-y-4">
        <label className="text-lg text-black ">Choose an image</label>
        {previewUrl && (
          <Image
            src={previewUrl}
            width={300}
            height={300}
            alt="image"
            className=""
          />
        )}
        <input
          onChange={handleFileChange}
          type="file"
          placeholder="Click to upload a image"
          className="border border-gray-300 rounded-md p-2"
        />
        <div className="space-x-2">
          <button
            onClick={() => uploadAImage()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
          <button
            onClick={() => setUploadImage(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
