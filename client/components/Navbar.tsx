"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/public/Messanger.webp";
import user from "@/public/User.jpg";
import { FaCaretDown } from "react-icons/fa";
import NavbarDropDown from "./NavbarDropDown";

const Navbar = () => {
  const [showDropdown, setShowDropDown] = useState<boolean>(false);

  const refValue = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refValue.current &&
        !refValue.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-between px-10 py-1 border-b-2 border-gray-200">
      {/* Logo Here */}
      <Image src={logo} alt="logo" width={50} height={50} />
      <div className="relative" ref={refValue}>
        <div
          className="relative"
          onClick={() => setShowDropDown(!showDropdown)}
        >
          <Image src={user} alt="user" width={50} height={50} />
          <FaCaretDown className="absolute bottom-0 right-1 text-black text-xl cursor-pointer " />
        </div>
        {showDropdown && <NavbarDropDown />}
      </div>
    </div>
  );
};

export default Navbar;
