import { baseUrl } from "@/constants/baseurl";

// import { UserFetchProps } from "@/types/Types";

export const getSingleUser = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}api/get/single`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      return data;
    }
  } catch (error: unknown) {
    console.log(error);
  }
};
