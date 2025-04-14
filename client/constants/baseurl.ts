import io from "socket.io-client";

export const baseUrl =
  (process.env.NEXT_BACKEND_URL as string) || "http://localhost:4000/";

const backendUrl =
  (process.env.NEXT_BACKEND_SOCKET_URL as string) || "http://localhost:4000";

export const socket = io(backendUrl);
