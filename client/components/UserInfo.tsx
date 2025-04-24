"use client";
import React, { useEffect, useRef } from "react";
import userImage from "@/public/User.jpg";
import Image from "next/image";
import { User } from "@/types/Types";
import { useParams, useRouter } from "next/navigation";
import { deleteConvo } from "@/services/Conversation";
import useCustomContext from "@/context/ContextHook";
import { RxCross1 } from "react-icons/rx";

interface UserInfroProps {
  userDetails: User | null;
}

const UserInfo = ({ userDetails }: UserInfroProps) => {
  const params = useParams();
  const { token, setShowInfo, showInfo } = useCustomContext();
  const router = useRouter();

  const deleteConversation = async () => {
    if (!token) return;
    const response = await deleteConvo(token, params.id as string);
    if (response?.success) {
      router.push("/");
    }
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickButtons = (e: MouseEvent) => {
      if (
        divRef.current &&
        !divRef.current.contains(e.target as Node) &&
        window.innerWidth <= 640
      ) {
        setShowInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickButtons);
    return () => {
      document.removeEventListener("mousedown", handleClickButtons);
    };
  });

  return (
    <>
      <div className="max-2xl:w-[25%] max-xl:w-[27%] max-lg:w-[35%] max-md:w-[32%] max-sm:hidden">
        <div className="flex justify-center items-center">
          <div>
            {userDetails?.image ? (
              <Image
                src={userDetails.image}
                alt="user"
                className=""
                width={60}
                height={60}
              />
            ) : (
              <Image
                src={userImage}
                alt="user"
                className="ml-10"
                width={60}
                height={60}
              />
            )}
            <div>
              <p className="font-bold text-xl text-center max-md:text-md">
                {userDetails?.name}
              </p>
              <p className="text-sm text-gray-500 text-center ">
                Active 1h ago
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-red-500 text-white mt-5 px-10 py-1 rounded-md  max-md:px-5 max-md:text-sm  "
            onClick={() => deleteConversation()}
          >
            Delete conversation
          </button>
        </div>
      </div>

      <div
        ref={divRef}
        className={`fixed  inset-0 h-full  z-30  text-black w-full bg-black/90 border border-gray-100 border-l-2 md:hidden
          `}
      >
        <div
          className={`absolute right-0 w-[40%] bg-white h-full transition-transform duration-300 ease-in-out ${
            showInfo ? "-translate-x-0" : "-translate-x-full "
          }   `}
        >
          <button
            className="flex self-end mt-2 px-2"
            aria-label="button"
            onClick={() => setShowInfo(false)}
            type="button"
          >
            <RxCross1 />
          </button>
          <div className="flex justify-center items-center">
            <div>
              {userDetails?.image ? (
                <Image
                  src={userDetails.image}
                  alt="user"
                  className=""
                  width={60}
                  height={60}
                />
              ) : (
                <Image
                  src={userImage}
                  alt="user"
                  className="ml-10"
                  width={60}
                  height={60}
                />
              )}
              <div>
                <p className="font-bold text-xl text-center max-md:text-md">
                  {userDetails?.name}
                </p>
                <p className="text-sm text-gray-500 text-center ">
                  Active 1h ago
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-red-500 text-white mt-5 px-10 py-1 rounded-md  max-md:px-5 max-md:text-sm  "
              onClick={() => deleteConversation()}
            >
              Delete conversation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
