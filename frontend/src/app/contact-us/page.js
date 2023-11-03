import React from 'react'
import Contact from '../components/Contact'
import '../styles/Contact.css'

export default function ContactUsPage() {
  return (
    <div className="content">
      <div style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/image6.png'})`
      }}></div>
      <div className='contact'>
        <Contact />
      </div>
    </div>
  )
}
