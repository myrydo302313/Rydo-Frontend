import React from 'react'
import { SocialIcon } from 'react-social-icons'
import '../styles/SocialLinks.css'

const SocialLinks = () => {
  return (
    <>
        <div className="social">
            <span>Find us on</span>
            <p><SocialIcon url="https://x.com/" /></p>
            <p><SocialIcon url="https://www.linkedin.com/" /></p>
            <p><SocialIcon url="https://www.instagram.com/" /></p>
        </div>
    </>
  )
}

export default SocialLinks
