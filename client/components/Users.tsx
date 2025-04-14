"use client";

import Image from "next/image";
import React, { useState } from "react";
import UserSettingDropdown from "./UserSettingDropdown";
import user from "@/public/User.jpg";
import { User } from "@/types/Types";
import { useRouter } from "next/navigation";
import ContextHook from "@/context/ContextHook";
import { fetchConversation } from "@/services/Conversation";

interface UserProps {
  data: User[] | [];
}

const Users: React.FC<UserProps> = ({ data }) => {
  const [isHoveredId, setIsHoveredId] = useState<string | undefined>("");
  const router = useRouter();
  const { token } = ContextHook();

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
          data.map((d, k) => (
            <div key={k}>
              <div
                className="px-2 py-1"
                onMouseEnter={() => setIsHoveredId(d._id)}
                onMouseLeave={() => setIsHoveredId("")}
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
                      <p className="text-md font-bold">{d.name}</p>
                      {/* <p className="text-sm">Active{"2"}</p> */}
                    </div>
                  </div>
                  {d._id === isHoveredId && <UserSettingDropdown />}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Users;
