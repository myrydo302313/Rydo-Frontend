import React from "react";
import '../styles/Home.css'
import { useAuth } from "../store/auth";
import BottomNav from "../components/BottomNav";

const Home = () => {

  const { user, isUserLoggedIn, captain } = useAuth();
  const User = user?.userData;

  {console.log("User", User)}
  {console.log("Login h kya", isUserLoggedIn)}


  console.log('captain',captain?.captainData.vehicleType)
  return (
    <>
      <BottomNav/>
    </>
  );
};

export default Home;
