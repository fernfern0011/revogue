import React from 'react'
import '../styles/ContactComponent.css'
import displayImg from '../../../public/background.jpg'
export default function Contact(){
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
                <textarea type='text' id='message' cols={38} rows={10} placeholder='Message' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}
