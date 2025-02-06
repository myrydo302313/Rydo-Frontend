import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SocialLinks from "../components/SocialLinks";
import '../styles/Home.css'

const Home = () => {
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
