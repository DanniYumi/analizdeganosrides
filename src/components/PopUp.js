import React from 'react'
import '../styles/Popup.css'
import {RiCloseCircleLine} from 'react-icons/ri';

const PopUp = (props) => {
  return (props.trigger)?(
    <div className='popup'>
        <div className='container_popup'>
        <button className='close' onClick={()=>props.setTrigger(false)}><RiCloseCircleLine color="#F3EEEE" size={30} /></button>
        {props.children}
        </div>
    </div>
  ):""
}

export default PopUp