import React from "react";
import '../styles/HomePlaces.css'

const HomePlaces = () => {
  return (
    <>
      <h2 className="places-heading">Ride to places with Rydo</h2>

      <div className="places-menu">
        <div className="places-menu-item">
            <img src="/images/railway.jpg" alt=""/>
            <span>Railway Station</span>
        </div>
        <div className="places-menu-item">
            <img src="/images/bus.jpg" alt="" />
            <span>Bus Stand</span>
        </div>
        <div className="places-menu-item">
            <img src="/images/jheel.jpg" alt="" />
            <span>Cafeteria</span>
        </div>
      </div>
    </>
  );
};

export default HomePlaces;
