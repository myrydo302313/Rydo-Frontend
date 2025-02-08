import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SocialLinks from "../components/SocialLinks";
import '../styles/Home.css'
import { useAuth } from "../store/auth";

const Home = () => {

  const { user, isLoggedIn } = useAuth();
  const User = user?.userData;

  {console.log("User", User)}
  {console.log("Login h kya", isLoggedIn)}

  return (
    <>
      <Navbar />
      <div className="home">
        <header className="hero-section">
          <HeroSection />
        </header>

        <section className="social-links">
          <SocialLinks />
        </section>
      </div>
    </>
  );
};

export default Home;
