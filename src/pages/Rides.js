import React, { useRef, useState, useEffect } from 'react'
import '../styles/Rides.css'
import emailjs from '@emailjs/browser'
import Select from 'react-select'
import PopUp from '../components/PopUp'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const Rides = () => {
  const [buttonPopUp, setButtonPopUp] = useState(false)
  const [bookings, setBookings]=useState([])
  const[bookingForm, setBookingForm]=useState({
    name:"",
    email:"",
    from:"",
    to:"",
    when:"",
    service:"",
    comments:""
  })
  const [popUActive, setPopUpActive]=useState(false)
  const bookingsCollectionRef =collection(db, "bookings")
  useEffect(()=>{
    onSnapshot(bookingsCollectionRef, snapshot =>{
        setBookings(snapshot.docs.map(doc=>{
          return{
            id:doc.id,
            viewing:false,
            ...doc.data()
          }
        }))
    })
  },
  [])
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

      <form ref={form}
        onSubmit={sendMessage}
        className='ride-form'
      >
        
        <div className='calendar'>
          <label for='slot'  className='label-form'> Choose the day for the ride</label>
          <input
            id="slot"
            type="datetime-local"
            min="2022-01-01T06:00"
            max="2025-01-01T00:00"

            className='imput-container'
            name='when'
            required
          />
          <span className="validity"></span>
        </div>
        <div className='ind-form'>
          <label className='label-form'>Type of rides</label>
          <Select 
          options={servicesList}
          name="type-ride"
          className='dropdown-form'
          required/>
        </div>
        <div className='ind-form'>
          <label className='label-form'>Name</label>
          <input
            placeholder="Name"
            name="user_name"
            className='imput-container' 
            required/>
        </div>
        <div className='ind-form'>
          <label className='label-form'>Email</label>
          <input
            placeholder="email"
            name="email"
            className='imput-container'
            required />
        </div>
        <div className='ind-form'>
          <label className='label-form'>Your Address</label>
          <input name="from"
            className='imput-container' 
            required/>
        </div>
        <div className='ind-form'>
          <label className='label-form'>Final destination</label>
          <input name="where"
            className='imput-container'
            required />
        </div>
        <div className='ind-form'>
          <label className='label-form'>Comments</label>
          <textarea placeholder='If you have any additional question or request, place here'
            name="comments"
            className='textarea-container' />
        </div>
        
        <button className='quote-btn'>Get Quote</button>
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