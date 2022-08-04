import React, { useEffect, useState } from 'react'
import {GoogleButton} from 'react-google-button';
import{UserAuth} from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignIn.css'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {googleSignIn, user}= UserAuth();
    const navigate =useNavigate()
    const {signIn}=UserAuth();

    const handleGoogleSignIn = async () => {
        try {
          await googleSignIn();
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        if(user != null){
            navigate('/account');
        }
      },[user]);

      const handleSubmit =async(e)=>{
        e.preventDefault();
        setError('')
        try{
            await signIn(email, password)
        }
        catch(e){
            setError(e.message)
            console.log(e.message)
        }
      }
  return (
    <div className='signin-container'>
      <div className='title-signup'>
      <h1>Are you part of our costumes? </h1>  
      <h1>Sign In</h1>
        </div>
        
        <form onSubmit={handleSubmit} className='form-box'>
          <div className='form-criterea'>
          <div className='form-label'>
          <label>Email</label>
          </div>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} className='form-input'/>
          </div>
          <div className='form-criterea'>
          <div className='form-label'>
            <label>Password</label>
            </div>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} className='form-input'/>
          </div>
          <button className='signInBTn'>Sign In</button>
          <div>Would you like to Sign In with your Google Account?</div>
          <div className='googleBtn'>
          <GoogleButton onClick={handleGoogleSignIn} />
          </div>
          <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        </form>

    </div>
  )
}

export default Signin