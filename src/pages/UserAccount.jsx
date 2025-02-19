import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import BottomNav from "../components/BottomNav";

const UserAccount = () => {

    const [currUser,setCurrUser]=useState({})

  const { user,logoutUser } = useAuth();

  useEffect(()=>{
    setCurrUser(user?.userData)
  })


  return (
    <>
        <h1>Welcome {currUser?.name}</h1>
        <button style={{backgroundColor:'#e71d36',padding:'7px',color:'white',width:'100px'}} onClick={logoutUser}>Logout</button>
      <BottomNav />
    </>
  );
};

export default UserAccount;
