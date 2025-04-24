import { baseUrl } from "@/constants/baseurl";
import { loginUserProps, userapi } from "@/types/Types";

const loginUser = {
  post: async (data: loginUserProps) => {
    try {
      const response = await fetch(`${baseUrl}api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const val = await response.json();
      return val as userapi;
    } catch (error: unknown) {
      return error as userapi;
    }
  },
};

export default loginUser;
