"use client";

import { baseUrl } from "@/constants/baseurl";
import useCustomContext from "@/context/ContextHook";
import Pusher from "pusher-js";
import { useEffect } from "react";

interface Props {
  userId: string;
}

interface DataProps {
  requestId: string;
  callerId: string; // Added missing callerId
  channelName: string;
}

export default function IncomingCallListener({ userId }: Props) {
  // Removed senderId prop
  const { token } = useCustomContext();

  useEffect(() => {
    if (!userId || !token) return;

    const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
    });

    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind("incoming-call", async (data: DataProps) => {
      console.log("Incoming call data:", data);

      try {
        // Use callerId from Pusher data instead of prop
        const accept = confirm(`Incoming call from ${data.callerId}. Accept?`);

        // CORRECTED: Use data.requestId instead of userId in URL
        const response = await fetch(
          `${baseUrl}api/call/${data.requestId}/update`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: accept ? "accepted" : "rejected",
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || "Failed to update call status"
          );
        }

        if (accept) {
          window.location.href = `/call?channel=${data.channelName}`;
        }
      } catch (error: unknown) {
        console.error("API Error:", error);
        alert(String(error) || "Failed to process call request");
      }
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`user-${userId}`);
      pusherClient.disconnect();
    };
  }, [userId, token]); // Removed senderId from dependencies

  return null;
}
