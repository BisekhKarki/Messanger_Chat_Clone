import { baseUrl } from "@/constants/baseurl";
import { User, userapi } from "@/types/Types";

const registerUser = {
  post: async function (data: User): Promise<userapi> {
    try {
      const response = await fetch(`${baseUrl}api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const val = await response.json();
      return val as userapi;
    } catch (error: unknown) {
      return error as userapi;
    }
  },
};

export default registerUser;
