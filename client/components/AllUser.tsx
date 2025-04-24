"use client";

import React, { useEffect, useState } from "react";
import Users from "./Users";
// import  from "@/context/ContextHook";
import { User } from "@/types/Types";
import user from "@/services/user";
import useCustomContext from "@/context/ContextHook";

interface Props {
  searchValue: string;
}

const AllUser = ({ searchValue }: Props) => {
  const { token } = useCustomContext();
  const [users, setUsers] = useState<User[]>([]);

  const fetchDetails = async () => {
    if (!token) return;
    const response = await user.get(token);
    if (response?.success) {
      setUsers(response.message);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      {users && users.length > 0 ? (
        <Users data={users} searchValue={searchValue} />
      ) : (
        <p>No Users found</p>
      )}
    </div>
  );
};

export default AllUser;
