import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SocialLinks from "../components/SocialLinks";
import '../styles/Home.css'
import { useAuth } from "../store/auth";

const Home = () => {

  const { user, isUserLoggedIn, captain } = useAuth();
  const User = user?.userData;

  {console.log("User", User)}
  {console.log("Login h kya", isUserLoggedIn)}


  console.log('captain',captain?.captainData.vehicleType)
  return (
    <>
      Home
    </>
  );
};

export default Home;
