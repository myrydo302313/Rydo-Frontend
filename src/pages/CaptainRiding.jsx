import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  return (
    <div className="h-screen relative flex flex-col justify-end">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
      </div>
      <div
        className="fixed w-full z-[500] bg-white px-3 py-10 pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>

    </div>
  );
};

export default CaptainRiding;
