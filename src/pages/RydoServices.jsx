import React from 'react'
import BottomNav from '../components/BottomNav'
import '../styles/RydoServices.css'

const RydoServices = () => {
  return (
    <>
        <div className="services">
            <div className="service-element">
                <img src="/images/autoBanner.jpg" alt=""/>
                <span>Rydo Auto</span>
            </div>
            <div className="service-element">
                <img src="/images/cabBanner.jpg" alt=""/>
                <span>Rydo Cab</span>
            </div>
        </div>
        <BottomNav/>
    </>
  )
}

export default RydoServices
