"use client"
import axios from 'axios';
import React, { useState } from 'react'
// import '../styles/ContactComponent.css'
import displayImg from '../../../public/background.jpg'

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
    <div className='flex-container'>
        <div className='picture-display'>
            <img src={displayImg} alt='why'/>
        </div>
        <div>
            <form>
                <h1>Contact Us</h1>
                <p className='title1'>Need to get in touch with us?</p>
                <p className='title2'>Fill out the form with your inquiry</p>
                <input type='text' name='fname' id='' placeholder='First Name'/>
                <input type='text' name='lname' id='' placeholder='Last Name'/>
                <input type='email' name='email' id='' placeholder='Enter Email'/>
                <textarea type='text' id='message' cols={38} rows={6} placeholder='Message' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}
