import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="footer fixed-bottom">
        <div className="container">
          <span>&copy; ReVogue {new Date().getFullYear()} All Rights Reserved</span>
        </div>
      </footer>
    </>
  )
}

export default Footer;

