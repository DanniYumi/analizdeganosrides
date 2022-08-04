import React from 'react'
import '../styles/Popup.css'

const PopUp = (props) => {
  return (props.trigger)?(
    <div className='popup'>
        <div className='container_popup'>
        <button className='close' onClick={()=>props.setTrigger(false)}>Close</button>
        {props.children}
        </div>
    </div>
  ):""
}

export default PopUp