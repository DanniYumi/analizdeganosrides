import React, { useEffect, useState } from 'react'

import{UserAuth} from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom';

const Reset = () => {
    const [email, setEmail] = useState("");
  const [error, setError] = useState('')
  const {sendPasswordReset}=UserAuth();
  
 

  const handleSubmit =async(e)=>{
    e.preventDefault();
    setError('')
    try{
        await sendPasswordReset(email)
    }
    catch(e){
        setError(e.message)
        console.log(e.message)
    }
  }
  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={handleSubmit}
        >
          Send password reset email
        </button>
        </div>
        </div>
  )
}

export default Reset