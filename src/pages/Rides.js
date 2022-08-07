import React, { useRef, useState, useEffect } from 'react'
import '../styles/Rides.css'
import emailjs from '@emailjs/browser'
import Select from 'react-select'
import PopUp from '../components/PopUp'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const Rides = () => {
  const [buttonPopUp, setButtonPopUp] = useState(false)
  
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [when, setWhen] = useState('')
  const [service, setService] = useState('')
  

  const handleSubmit = async (e) => {
      e.preventDefault()
      const rideCollectionRef = collection(db, "rides")
      addDoc(rideCollectionRef, { name: name, comment: comment,  email:email, from:from, to:to, when:when, service:service }).then(response => {
          console.log(response)
      }).catch(error => {
          console.log(error.message)
      })
            setComment(' ');
            setName('');
            setEmail('');
            setFrom(' ');
            setTo('');
            setWhen('');
            setService('')
  }
  

  const form = useRef()


  const sendMessage = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kkfmvad', 'template_wh2b6nk', form.current, 'uNsEOEO4to8UWzV9r')
      .then((result) => {
        console.log(result.text);
        console.log(setButtonPopUp(true));
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()

  };
 
  return (
    <div className='rides-container'>
      <div className='.contact-tittle'>
        <h1> Get your quotation here</h1>
      </div>

      <form ref={form}
        onSubmit={handleSubmit}
        className='ride-form'
      >
        
        <div className='ind-form-rides'>
          <label for='slot'  className='label-form-rides'> Choose the day for the ride</label>
          <input
            id="slot"
            type="datetime-local"
            min="2022-01-01T06:00"
            max="2025-01-01T00:00"
            value={when}
            className='imput-container-rides'
            name='when'
            onChange={e => setWhen(e.target.value)}
            required
          />
          <span className="validity"></span>
        </div>
        <div className='ind-form-rides'>
          <label className='label-form-rides'>Type of rides</label>
          <select value={service}
          onChange={e => setService(e.target.value)}
          name="type-ride"
          className='dropdown-form'
          required>
          <option value="airport" >Airport Shuttle</option>
          <option value="quick" >Quick Rides</option>
          <option value="tourism" >Tourism</option>
          <option value="interstate" >Interstate</option>
          </select>
        </div>
        <div className='ind-form-rides'>
          <label className='label-form-rides'>Name</label>
          <input
            placeholder="Name"
            name="user_name"
            value={name}
            className='imput-container-rides' 
            onChange={e => setName(e.target.value)}
            required/>
        </div>
        <div className='ind-form-rides'>
          <label className='label-form-rides'>Email</label>
          <input
            placeholder="email"
            value={email}
            name="email"
            className='imput-container-rides'
            onChange={e => setEmail(e.target.value)}
            required />
        </div>
        <div className='ind-form-rides'>
          <label className='label-form-rides'>Your Address</label>
          <input name="from"
          value={from}
            className='imput-container-rides' 
            onChange={e => setFrom(e.target.value)}
            required/>
        </div>
        <div className='ind-form-rides'>
          <label className='label-form-rides'>Final destination</label>
          <input name="where"
          value={to}
            className='imput-container-rides'
            onChange={e => setTo(e.target.value)}
            required />
        </div>
        <div className='ind-form-rides'>
          <label className='label-form-rides'>Comments</label>
          <textarea placeholder='If you have any additional question or request, place here'
            name="comments"
            value={comment}
            className='textarea-container-rides' 
            onChange={e => setComment(e.target.value)}/>
        </div>
        
        <button onClick={sendMessage} className='quote-btn'>Get Quote</button>
        <PopUp
          trigger={buttonPopUp}
          setTrigger={setButtonPopUp}>
          <p>Thank you! Your request has been sent, we will be in Contact with you as soon as possible.</p>
        </PopUp>
      </form>

    </div>
  )
}

export default Rides