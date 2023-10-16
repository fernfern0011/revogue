import React from 'react'
import '../styles/Footer.css'

export default function Footer(){
  return (
    <div className='footer'>
        <footer className="footer">
            <p>&copy; ReVogue {new Date().getFullYear()} All Rights Reserved</p>
      </footer>
    </div>
  )
}
