"use client";

import { baseUrl } from "@/constants/baseurl";
import useCustomContext from "@/context/ContextHook";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface Props {
  id: string | undefined;
  setShowPop: (value: boolean) => void;
}

const CallPopup = ({ id, setShowPop }: Props) => {
  const [loading, setLoading] = useState(false);
  const { token } = useCustomContext();

  const sendCallRequest = async () => {
    setLoading(true);
    const channelName = `call-${Date.now()}`;
    try {
      const response = await fetch(`${baseUrl}api/call/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          calleeId: id,
          channelName: channelName,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate call");
      }

      // Redirect if needed or handle success
      console.log("Call initiated:", data);
    } catch (error: unknown) {
      console.log(String(error));
    }
  };

  useEffect(() => {
    if (token) sendCallRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center">
      <div className="bg-white px-10 py-10 rounded-xl relative ">
        <div className="absolute top-1 right-2 z-10">
          <RxCross1
            onClick={() => setShowPop(false)}
            className="cursor-pointer"
          />
        </div>
        {loading ? "Sending..." : "Start Video Call"}
      </div>
    </div>
  );
};

export default CallPopup;
