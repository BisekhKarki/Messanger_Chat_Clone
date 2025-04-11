"use client";

import Messagebox from "@/components/Messagebox";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Messagebox />
      </div>
    </>
  );
};

export default Page;
