"use client";
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
}

export const Context = createContext<ContextPropsValues | null>(null);

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const checkToken = () => {
    if (typeof window === "undefined") return;
    const getLocalStorage = localStorage.getItem("Token");

    if (!getLocalStorage) {
      router.push("/login");
    } else if (getLocalStorage) {
      setToken(getLocalStorage as string);
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    showInfo,
    setShowInfo,
    loading,
    setLoading,
    checkToken,
    token,
    setToken,
  };

  return token ? (
    <Context.Provider value={value}>{children}</Context.Provider>
  ) : null;
};

export default ContextProvider;
