import React from 'react'
import '../styles/HeroSection.css'

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Ride with Ease - Your Riding Partner</h1>
        <p>Fast, Affordable, and Reliable Rides Anytime, Anywhere!</p>
      </div>
      <img
        src="/images/banner.jpeg"
        alt="Hero Banner"
        className="hero-image"
      />
    </div>
  )
}

export default HeroSection
