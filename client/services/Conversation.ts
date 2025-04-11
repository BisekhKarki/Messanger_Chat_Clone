import { baseUrl } from "@/constants/baseurl";

export const fetchConversation = async (
  id: string | undefined,
  token: string
) => {
  try {
    const response = await fetch(`${baseUrl}api/conversation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: id }),
    });
    const data = await response.json();
    if (response.status === 201 || response.status === 200) {
      return data;
    }
  } catch (error: unknown) {
    console.log(String(error));
  }
};

export const fetchUserDetails = async (
  token: string,
  conversationId: string
) => {
  try {
    const response = await fetch(`${baseUrl}api/conversation/userDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ conversationId: conversationId }),
    });
    const data = await response.json();

    if (response.status === 201 || response.status === 200) {
      return data;
    }
  } catch (error: unknown) {
    console.log(String(error));
  }
};
