"use client";

import Messagebox from "@/components/Messagebox";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useCustomContext from "@/context/ContextHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Sidebar from "@/components/Sidebar";

export default function Home() {
  const router = useRouter();
  const { checkToken } = useCustomContext();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Messagebox />
      </div>
    </div>
  );
}
