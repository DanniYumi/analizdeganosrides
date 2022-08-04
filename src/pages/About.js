import React from 'react'
import ProfileImg from '../assets/analizprofile.jpg'
import '../styles/About.css'

const About = () => {
  return (
    <div className='about-container'>
        <div className='about-text-container'>
        <div className='about-title'>
            <h1>Analiz Deganos</h1>
        </div>
        <div className='about-text'>
            <p></p>
        </div>
        </div>
        <div className='img-display'>
        <img src={ProfileImg} className="about-img"></img>
        </div>
    </div>
  )
}

export default About