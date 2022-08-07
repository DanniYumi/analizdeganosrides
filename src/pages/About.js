import React from 'react'
import ProfileImg from '../assets/analizprofile.jpg'
import '../styles/About.css'
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <div className='about-container'>
        <div className='about-text-container'>
        <div className='about-title'>
            <h1>Analiz Deganos</h1>
        </div>
        <div className='about-text'>
            <p>Lorem ipsum dolor sit amet. Qui repellat aperiam quo mollitia iusto cum suscipit voluptate eos atque galisum 33 quam iure. Et omnis dolores sit sunt molestiae et quis eveniet cum magni quas hic voluptates corporis ut architecto quia ut harum laboriosam. Et amet maiores qui recusandae provident aut itaque iste est neque odit.

Vel explicabo vero ut rerum molestiae id possimus incidunt. In natus error qui dolorum voluptates non galisum sunt ut rerum alias et earum cumque est esse error id praesentium maxime. 33 nemo nemo sit excepturi debitis ut dolore consectetur id temporibus ipsum velit veniam.

At laudantium mollitia et consequatur distinctio quo cumque velit. Ea quod voluptatem vel recusandae blanditiis id inventore dolorum et mollitia odio ea aliquam obcaecati. Et aliquid ratione eos consequuntur illum et vitae ullam vel autem quidem a earum atque ut commodi recusandae.</p>
        </div>
        <div className='goReviews'>
        <Link to="/reviews"> Want to know what other costumers think about their rides?</Link>
        </div>
        </div>
        <div className='img-display'>
        <img src={ProfileImg} className="about-img"></img>
        </div>
    </div>
  )
}

export default About