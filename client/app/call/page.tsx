// app/call/page.tsx (or pages/call.tsx for Pages Router)
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CallPage() {
  const router = useRouter();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection>(null);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const channel = searchParams.get("channel");

        if (!channel) {
          throw new Error("Missing channel parameter");
        }

        // Initialize WebRTC connection
        const config = {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            // Add your TURN servers here if needed
          ],
        };

        peerConnection.current = new RTCPeerConnection(config);

        // Setup media streams
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Add tracks to peer connection
        stream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, stream);
        });

        // Listen for ICE candidates
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            // Send candidate to signaling server
          }
        };

        // Listen for remote tracks
        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // Connect to signaling server (Pusher)
        // Implement your signaling logic here
      } catch (error) {
        console.error("Call initialization failed:", error);
        router.push("/error");
      }
    };

    initializeCall();

    return () => {
      peerConnection.current?.close();
    };
  }, [router]);

  return (
    <div className="call-container">
      <div className="video-container">
        <video ref={localVideoRef} autoPlay muted className="local-video" />
        <video ref={remoteVideoRef} autoPlay className="remote-video" />
      </div>
    </div>
  );
}
