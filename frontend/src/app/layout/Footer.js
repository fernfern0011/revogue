import React from 'react'

const Footer = () => {
  return (
    <div className="footer navbar-fixed-bottom">
      <div className="container">
        <span>&copy; ReVogue {new Date().getFullYear()} All Rights Reserved</span>
      </div>
    </div>
  )
}

export default Footer;

