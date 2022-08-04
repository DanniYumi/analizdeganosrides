import React from 'react'
import MainImg from '../assets/analiz.jpg'
import Book from '../assets/book.png'
import Services from '../assets/services.png'
import Availability from '../assets/availability.png'
import { Link } from 'react-router-dom'

import '../styles/Home.css'

const Home = () => {
  return (
    <div className='home'>
        <div className='containerHeader'>
            <div className='header-left'>
                <div className='headerl-left-text'>
                Become one of our loyal clients
                </div>
                
                <Link className="btn-SignIn" to="/signup">Sign Up Now</Link>
               
            </div>
            <div className='header-right'>
                <img src={MainImg} className="header-img"></img>
            </div>
        </div>
        <div className="body-title">
              How to ride with us?
          </div>
      <div className="body-container-steps">
    
        <div className='step-container'>
          <div className="steps-image">
                <img src={Services} alt="service-img"></img>
            </div>   
               <div className="steps-title">
                  Services
                  </div>
                   <div className="steps-text">
                   Check all the services we offer and choose the one better fit your needs.
                  </div>
                  </div>
                  <div className='step-container'>
          <div className="steps-image">
                <img src={Availability} alt="availability-img"></img>
            </div>   
               <div className="steps-title">
                  Rides
                  </div>
                   <div className="steps-text">
                   Ask for availability and cottation for the service.
                  </div>
                  </div>
                  <div className='step-container'>
          <div className="steps-image">
                <img src={Book} alt="book-img"></img>
            </div>   
               <div className="steps-title">
                  Book
                  </div>
                   <div className="steps-text">
                   Pay the fair, receive email and confirmation and enjoy your ride.
                  </div>
                  </div>
                 
              </div>
              <div className='service-box'>
              <div className='service-text'>
            Check our services and Fairs
                </div>
                <a href='/services' className='btn-service'>
                    Services
                </a>
              </div>
    </div>
  )
}

export default Home