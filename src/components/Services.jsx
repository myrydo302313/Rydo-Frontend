import React from "react";
import "../styles/Services.css";

const Services = () => {
  return (
    <>
      <h2 align="center">Our Services</h2>
      <div className="services">
        <div className="service">
          <img src="/images/auto.jpg" width={80} height={80} alt="" />
          <p>Auto</p>
        </div>
        <div className="service">
          <img src="/images/rydo_bike.webp" width={80} height={80} alt="" />
          <p>Moto</p>
        </div>
        <div className="service">
          <img src="/images/courier.jpg" width={80} height={80} alt="" />
          <p>Courier</p>
        </div>
        <div className="service">
          <img src="/images/cab.jpg" width={80} height={120} alt="" />
          <p>Cab</p>
        </div>
      </div>
    </>
  );
};

export default Services;
