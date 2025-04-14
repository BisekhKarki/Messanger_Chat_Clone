"use client";

import ContextHook from "@/context/ContextHook";
import loginUser from "@/services/userLogin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface FormDataProps {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const { loading, setLoading } = ContextHook();
  const [formData, setFormData] = useState<FormDataProps>({
    email: "",
    password: "",
  });

  const updateInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const val = await loginUser.post(formData);
    if (val?.success) {
      localStorage.setItem("Token", val.token as string);
      setLoading(false);
      toast.success(val.message);
      router.push("/");
      return;
    } else {
      setLoading(false);
      toast.error(val?.message);
    }
  };

  return (
    <div className="bg-blue-50 h-[100vh]">
      <div className="flex justify-center py-20">
        <div className="border border-gray-300 px-10 bg-white py-10 shadow-lg rounded-lg">
          <h1 className="text-center font-bold text-3xl">Login to chatlify</h1>
          <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-2 py-2 rounded-md"
              onChange={updateInformation}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-2 py-2 rounded-md"
              onChange={updateInformation}
            />
            {loading ? (
              <div className="flex justify-center w-full  mb-2">
                <button
                  type="button"
                  className="flex items-center bg-green-700 px-4 py-2 w-full text-center justify-center text-white"
                  disabled
                >
                  <svg
                    className="animate-spin w-5 h-5 mr-2 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Loading</span>
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className=" px-10 py-2 mb-2  bg-green-700 text-white rounded-md w-full"
              >
                Login
              </button>
            )}
          </form>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => router.replace("/signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
