import React from 'react'
import Fb from '../assets/facebookIcon.png'
import Insta from '../assets/instagramIcon.png'
import Lkin from '../assets/linkedinIcon.png'
import {Link} from 'react-router-dom'
import '../styles/Footer.css'


const Footer = () => {
  return (
    <div className='container-footer'>
        <div className="nav-links-footer" >
        
            <Link to="/terms"> Terms And Conditions </Link>
             <Link to="/faq"> FAQ's</Link>
            <Link to="/services"> Services </Link>
             <Link to="/about"> About Us </Link>
            <Link to="/contact"> Contact Us</Link>
                    
        </div>
       
        <div className='social-media'>
                <div className='social-title'>
                    Follow Us on Social Media
                </div>
                <div className='social-media-links'>
                    <a href="https://www.instagram.com/analizzzzzzz/"><img src={Insta} alt="instagram-icon"></img></a> 
                    <a to="https://www.facebook.com/adeganos"><img src={Fb} alt="facebook-icon"></img></a>
                    <Link to="#"><img src={Lkin} alt="linkedin-icon"></img></Link>
                </div>
            </div>
</div>
  )
}

export default Footer