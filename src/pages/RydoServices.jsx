import React from "react";
import BottomNav from "../components/BottomNav";
import "../styles/RydoServices.css";

const RydoServices = () => {
  return (
    <>
      <h2 className="services-head" align="center">
        Our Services
      </h2>
      <div className="services">
        <div className="service-element">
          <img src="/images/autoBanner.jpg" alt="" />
          <span>Rydo Auto</span>
        </div>
        <div className="service-element">
          <img src="/images/rydo_bike.webp"alt="" />
          <span>Rydo Moto</span>
        </div>
        <div className="service-element">
          <img src="/images/cabBanner.jpg" alt="" />
          <span>Rydo Cab</span>
        </div>
        <div className="service-element">
          <img src="/images/parcelBanner2.jpg" alt="" />
          <span>Rydo Parcel</span>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default RydoServices;
