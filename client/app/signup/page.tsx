"use client";
import ContextHook from "@/context/ContextHook";
import registerUser from "@/services/userRegister";
import { User } from "@/types/Types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { loading, setLoading } = ContextHook();

  const [formData, setFormData] = useState<User>({
    name: "",
    date_of_birth: "",
    email: "",
    gender: "",
    password: "",
    phone: "",
    image: null,
  });

  const updateFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const genderValue =
      formData.gender.charAt(0).toUpperCase() +
      formData.gender.slice(1).toLowerCase();
    const newFromData = { ...formData, gender: genderValue };

    if (formData.phone.length !== 10) {
      return toast.error("Invalid phone number");
    }

    setLoading(true);

    const getVal = await registerUser.post(newFromData);
    if (getVal.success) {
      toast.success(getVal.message);
      router.push("/login");
      setLoading(false);
    } else {
      toast.error(getVal.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50">
      <div className="flex justify-center py-5">
        <div className=" border py-10 rounded border-gray-300 shadow-lg bg-white">
          <form className="space-y-2" onSubmit={onSubmit}>
            <h1 className="text-center text-3xl font-bold">
              Create a new account
            </h1>
            <p className="text-center text-gray-400">Its quick and easy</p>
            <hr className="w-full text-gray-400 mb-5" />
            <div className="px-10 space-y-5">
              <input
                placeholder="Enter you name"
                type="text"
                className="border px-2 py-1 border-gray-400 rounded-sm w-full"
                name="name"
                onChange={updateFormValues}
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-bold">
                  Date of Birth
                </label>
                <input
                  placeholder="date"
                  type="date"
                  className="border px-2 py-1 border-gray-400 rounded-sm"
                  name="date_of_birth"
                  onChange={updateFormValues}
                />
              </div>
              <div>
                <p className="font-bold">Gender</p>
                <div className="flex gap-2">
                  <div className="border rounded-sm border-gray-400 px-10 flex gap-2 ">
                    <label htmlFor="">Male</label>
                    <input
                      placeholder="Male"
                      type="radio"
                      name="gender"
                      value={"Male"}
                      onChange={updateFormValues}
                    />
                  </div>
                  <div className="border rounded-sm border-gray-400 px-10 flex gap-2 ">
                    <label htmlFor="">Female</label>
                    <input
                      placeholder="Female"
                      type="radio"
                      name="gender"
                      value={"Female"}
                      onChange={updateFormValues}
                    />
                  </div>
                  <div className="border rounded-sm border-gray-400 px-10 flex gap-2 ">
                    <label htmlFor="">Others</label>
                    <input
                      placeholder="Others"
                      type="radio"
                      name="gender"
                      value={"Others"}
                      onChange={updateFormValues}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  <input
                    placeholder="Mobile Number"
                    type="text"
                    className="border px-2 py-1 border-gray-400 rounded-sm"
                    name="phone"
                    onChange={updateFormValues}
                  />
                  <input
                    placeholder="Email"
                    type="email"
                    className="border px-2 py-1 border-gray-400 rounded-sm"
                    name="email"
                    onChange={updateFormValues}
                  />
                  <input
                    placeholder="password"
                    type="password"
                    className="border px-2 py-1 border-gray-400 rounded-sm"
                    name="password"
                    onChange={updateFormValues}
                  />
                </div>
              </div>
            </div>
            <div className="px-10 mt-3">
              <div className="flex justify-center">
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
                    Singup
                  </button>
                )}
              </div>
              <p className="text-center">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => router.replace("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
