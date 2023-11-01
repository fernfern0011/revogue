"use client"
import axios from 'axios';
import React, { useState } from 'react'
import '../styles/ContactComponent.css'
// import displayImg from '../../../public/background.jpg'
import Image from "next/image";

const Contact = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

    // Create an object with EmailJS service ID, template ID, Public Key, and Template params
    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: `${firstName} ${lastName}`,
        from_email: email,
        to_name: 'ReVogue Support',
        message: message,
      }
    };

    // Send the email using EmailJS
    try {
      const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      console.log(res.data);
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="contact-container">
    <div className='flex-container'>
      <div className='picture-display'>
        <Image
          className="img-fluid"
          src="/images/image6.png"
          alt="why"
          width={300}
          height={600}
        />
      </div>
      <div>
        <form onSubmit={handleSubmit} className='emailForm'>
          <h1>Contact Us</h1>
          <p className='title1'>Need to get in touch with us?</p>
          <p className='title2'>Fill out the form with your inquiry</p>
          <div className="name-fields">
            <input
              type="text"
              placeholder="Your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{marginRight: '3px'}}
            />
            <input
              type="text"
              placeholder="Your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{marginLeft: '3px'}}
            />
          </div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            cols="38"
            rows="5"
            placeholder='Message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          >
          </textarea>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Contact