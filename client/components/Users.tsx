"use client";

import Image from "next/image";
import React from "react";
// import UserSettingDropdown from "./UserSettingDropdown";
import user from "@/public/User.jpg";
import { User } from "@/types/Types";
import { useRouter } from "next/navigation";
import useCustomContext from "@/context/ContextHook";
import { fetchConversation } from "@/services/Conversation";
import LastMessage from "./Messages/LastMessage";

interface UserProps {
  data: User[] | [];
  searchValue: string;
}

const Users: React.FC<UserProps> = ({ data, searchValue }) => {
  // const [isHoveredId, setIsHoveredId] = useState<string | undefined>("");
  const router = useRouter();
  const { token } = useCustomContext();

  const getConversation = async (id: string | undefined) => {
    if (!token) return;
    const response = await fetchConversation(id, token);
    router.push(`/message/${response.data}`);
  };

  return (
    <>
      <div className="space-y-2">
        {data &&
          data.length > 0 &&
          data
            .filter((user) =>
              user.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((d, k) => (
              <div key={k}>
                <div
                  className="px-2 py-1"
                  // onMouseEnter={() => setIsHoveredId(d._id)}
                  // onMouseLeave={() => setIsHoveredId("")}
                  onClick={() => getConversation(d._id)}
                >
                  <div className="flex items-center justify-between px-2 hover:bg-gray-300  cursor-pointer  py-1">
                    <div className="flex items-center gap-2">
                      {d.image ? (
                        <Image
                          src={d.image}
                          alt="user"
                          width={65}
                          height={65}
                          className="rounded-full"
                        />
                      ) : (
                        <Image
                          src={user}
                          alt="user"
                          width={65}
                          height={65}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-md text-gray-600">{d.name}</p>
                        {/* <p className="text-sm">Active{"2"}</p> */}
                        <LastMessage id={d._id as string} />
                      </div>
                    </div>
                    {/* {d._id === isHoveredId && <UserSettingDropdown />} */}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Users;
