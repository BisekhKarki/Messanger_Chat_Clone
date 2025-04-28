import { baseUrl } from "@/constants/baseurl";
import {
  messageApi,
  // MessageGetProps,
  MessageProps,
  userapi,
} from "@/types/Types";

export const sendMessage = async (token: string, data: MessageProps) => {
  try {
    const response = await fetch(`${baseUrl}api/message/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    });
    const value = await response.json();
    return value as userapi;
  } catch (error: unknown) {
    console.log(String(error));
  }
};

export const fetchMessages = async (
  token: string,
  conversationId: string | undefined
) => {
  try {
    const response = await fetch(
      `${baseUrl}api/message/get/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const value = await response.json();
    return value;
  } catch (error: unknown) {
    console.log(String(error));
  }
};

export const sendImages = async (token: string, data: FormData) => {
  try {
    const response = await fetch(`${baseUrl}api/images/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: data,
    });
    const value = await response.json();
    return value as userapi;
  } catch (error: unknown) {
    console.log(String(error));
  }
};

export const deleteMessage = async (token: string, id: string) => {
  try {
    const response = await fetch(`${baseUrl}api/message/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const value = await response.json();
    return value as userapi;
  } catch (error: unknown) {
    console.log(String(error));
  }
};

export const editMessage = async (
  token: string,
  id: string,
  message: string
) => {
  try {
    const response = await fetch(`${baseUrl}api/message/edit/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    const value = await response.json();
    return value as userapi;
  } catch (error: unknown) {
    console.log(String(error));
  }
};

export const lastMessage = async (token: string, id: string) => {
  try {
    const response = await fetch(`${baseUrl}api/message/last`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otherUser: id,
      }),
    });
    const value = await response.json();
    return value as messageApi;
  } catch (error: unknown) {
    console.log(String(error));
  }
};
