"use client"
import axios from 'axios';
import React, { useState } from 'react'
import '../styles/ContactComponent.css'
import displayImg from '../../../public/background.jpg'

const Contact = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_w7vfh9m';
    const templateId = 'template_y7alhuq';
    const publicKey = 'cRBSWSgN4tpiDpNAG';

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
    <div className='flex-container'>
      <div className='picture-display'>
        <img src="/images/image6.png" alt='why' />
      </div>
      <div>
        <form onSubmit={handleSubmit} className='emailForm'>
          <h1>Contact Us</h1>
          <p className='title1'>Need to get in touch with us?</p>
          <p className='title2'>Fill out the form with your inquiry</p>
          <input
            type="text"
            placeholder="Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            cols="38"
            rows="6"
            placeholder='Message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          >
          </textarea>
          <button type="submit">Send Email</button>
        </form>
      </div>
    </div>
  )
}

export default Contact