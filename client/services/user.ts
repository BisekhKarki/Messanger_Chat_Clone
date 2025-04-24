import { baseUrl } from "@/constants/baseurl";
import { UserFetchProps } from "@/types/Types";

const user = {
  get: async function getAllUsers(token: string) {
    try {
      const response = await fetch(`${baseUrl}api/get/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(response);
      return data as UserFetchProps;
    } catch (error: unknown) {
      console.log(error);
    }
  },
};

export default user;
