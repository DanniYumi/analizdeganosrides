import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import PopUp from '../components/PopUp'
import '../styles/Contact.css'
import {GiVibratingSmartphone} from 'react-icons/gi';


const Contact = () => {
  const [buttonPopUp, setButtonPopUp] = useState(false)
  const form = useRef()


  const sendMessage = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kkfmvad', 'template_2qan1k2', form.current, 'uNsEOEO4to8UWzV9r')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()

  };

  return (
    <div className='contact-container'>
      <div className='contact-tittle'>
        <h1>Contact us</h1>
      </div>   
    <div className="formContact">
     <h3>Contact us through our phone</h3>
     </div>
    <div className="phone">
     <GiVibratingSmartphone color="#F3EEEE" size={30}/>
     <p>(+61) 0426844072</p>
    </div>
      <div className='contact-text'>
        Do you have any doubts? Please write your message bellow.
      </div>
      <form
        ref={form}
        onSubmit={sendMessage}
        className='contact-form'>
        <label>Full Name</label>
        <input
          placeholder="name"
          name="user_name"
          className='imput-container'
          required
        />

        <label>Email</label>
        <input
          placeholder="email"
          name="user_email"
          className='imput-container'
          required
        />
        <label>Write your Message</label>
        <textarea
          placeholder="message"
          name="user_message"
          className='textarea-container'
          required
        />
        <button
          type="submit"
          onClick={() => setButtonPopUp(true)}
          className="send-btn">Send</button>
        <PopUp
          trigger={buttonPopUp}
          setTrigger={setButtonPopUp}>
          <p>Message sucessfully sent, we will reply to you as soon as possible</p>
        </PopUp>
      </form>

    </div>

  )
}

export default Contact