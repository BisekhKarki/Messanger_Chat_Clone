"use client";

import DisplayMessage from "@/components/DisplayMessage";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import React from "react";

const Page = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <DisplayMessage />
        </div>
      </div>
    </>
  );
};

export default Page;
