"use client";
import { baseUrl } from "@/constants/baseurl";
import { User } from "@/types/Types";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

interface ContextPropsValues {
  showInfo: boolean;
  setShowInfo: (showInfo: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  checkToken: () => void;
  token: string;
  setToken: (value: string) => void;
  user: User | null;
  changeMessage: boolean;
  setChangeMessage: (value: boolean) => void;
}

export const Context = createContext<ContextPropsValues | null>(null);

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [changeMessage, setChangeMessage] = useState(false);
  const router = useRouter();

  const checkToken = () => {
    // if (typeof window === "undefined") return;
    const getLocalStorage = localStorage.getItem("Token");

    if (!getLocalStorage) {
      router.push("/login");
    } else if (getLocalStorage) {
      setToken(getLocalStorage as string);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`${baseUrl}api/user/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        setUser(data.message);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = {
    showInfo,
    setShowInfo,
    loading,
    setLoading,
    checkToken,
    token,
    setToken,
    user,
    changeMessage,
    setChangeMessage,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
