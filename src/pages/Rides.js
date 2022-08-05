import React, { useRef, useState, useEffect } from 'react'
import '../styles/Rides.css'
import emailjs from '@emailjs/browser'
import Select from 'react-select'
import PopUp from '../components/PopUp'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const Rides = () => {
  const [buttonPopUp, setButtonPopUp] = useState(false)
  const [bookings, setBookings]=useState([])
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
  }
  

  const form = useRef()


  const sendMessage = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kkfmvad', 'template_wh2b6nk', form.current, 'uNsEOEO4to8UWzV9r')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()

  };
  const servicesList=[
    {
      value:"airport",
      label:"Airport Shuttle"
    },
    {
      value:"quick",
      label:"Quick Rides"
    },
    {
      value:"tourism",
      label:"Tourism"
    },
    {
      value:"interstate",
      label:"Interstate"
    },
  ]
  return (
    <div className='rides-container'>
      <div className='.contact-tittle'>
        <h1> Get your quotation here</h1>
      </div>

      <form //ref={form}
        onSubmit={handleSubmit}
        className='ride-form'
      >
        
        <div className='calendar'>
          <label for='slot'  className='label-form'> Choose the day for the ride</label>
          <input
            id="slot"
            type="datetime-local"
            min="2022-01-01T06:00"
            max="2025-01-01T00:00"
            value={when}
            className='imput-container'
            name='when'
            onChange={e => setWhen(e.target.value)}
            required
          />
          <span className="validity"></span>
        </div>
        <div className='ind-form'>
          <label className='label-form'>Type of rides</label>
          <Select 
          value={service}
          options={servicesList}
          onChange={e => setService(e.target.value)}
          name="type-ride"
          className='dropdown-form'
          required/>
        </div>
        <div className='ind-form'>
          <label className='label-form'>Name</label>
          <input
            placeholder="Name"
            name="user_name"
            value={name}
            className='imput-container' 
            onChange={e => setName(e.target.value)}
            required/>
        </div>
        <div className='ind-form'>
          <label className='label-form'>Email</label>
          <input
            placeholder="email"
            value={email}
            name="email"
            className='imput-container'
            onChange={e => setEmail(e.target.value)}
            required />
        </div>
        <div className='ind-form'>
          <label className='label-form'>Your Address</label>
          <input name="from"
          value={from}
            className='imput-container' 
            onChange={e => setFrom(e.target.value)}
            required/>
        </div>
        <div className='ind-form'>
          <label className='label-form'>Final destination</label>
          <input name="where"
          value={to}
            className='imput-container'
            onChange={e => setTo(e.target.value)}
            required />
        </div>
        <div className='ind-form'>
          <label className='label-form'>Comments</label>
          <textarea placeholder='If you have any additional question or request, place here'
            name="comments"
            value={comment}
            className='textarea-container' 
            onChange={e => setComment(e.target.value)}/>
        </div>
        
        <button onClick={() => setButtonPopUp(true)} className='quote-btn'>Get Quote</button>
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