"use client";

import Messagebox from "@/components/Messagebox";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ContextHook from "@/context/ContextHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Sidebar from "@/components/Sidebar";

export default function Home() {
  const router = useRouter();
  const { checkToken } = ContextHook();

  useEffect(() => {
    checkToken();
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
