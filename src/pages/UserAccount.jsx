import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import BottomNav from "../components/BottomNav";

const UserAccount = () => {

    const [currUser,setCurrUser]=useState({})

  const { user } = useAuth();

  useEffect(()=>{
    setCurrUser(user?.userData)
  })


  return (
    <>
        <h1>Welcome {currUser?.name}</h1>
      <BottomNav />
    </>
  );
};

export default UserAccount;
