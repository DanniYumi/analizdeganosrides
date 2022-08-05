
import React,{useState, useEffect} from 'react'
import{Link, useNavigate} from 'react-router-dom'
import{UserAuth} from'../context/AuthContext'
import {GoogleButton} from 'react-google-button';
import'../styles/SignUp.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState("");
  const [error, setError] = useState('')
  const {googleSignIn, user}= UserAuth();

  const {createUser} = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')
    try{
      await  createUser(name,email, password)
      navigate('/account')
   }catch(e){
      setError(e.message)
     console.log(e.message)
   }
  }

  return (
    <div className='signup-container'>
      <div className='title-signup'>
        <h1>Sign Up</h1>
      <h2>Don't have an account with us yet? </h2>
        </div>
        
        <form onSubmit={handleSubmit} className='form-box-signup'>
          <div className='form-criterea-signup'>
          <div className='form-label-signup'>
          <label>Name</label>
          </div>
          <input 
            type="name" 
            onChange={(e)=>setName(e.target.value)} 
            className='form-input-signup'
            required/>
          
          <div className='form-label-signup'>
          <label>Email</label>
          </div>
            <input 
            type="email" 
            onChange={(e)=>setEmail(e.target.value)} 
            className='form-input-signup'
            required/>
          </div>
          <div className='form-criterea-signup'>
          <div className='form-label-signup'>
            <label>Password</label>
            </div>
            <input 
            type="password" 
            onChange={(e)=>setPassword(e.target.value)} 
            className='form-input-signup'
            required/>
          </div>
          <button className='signUpBTn'>Sign Up</button>
          <div>Would you like to Sign In with your Google Account?</div>
          <div className='googleBtn'>
          <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </form>
        <h2 className='gosignin'>Already a costumer? </h2> <Link className='singinbtn'to='/signin'>Sign in</Link>
    </div>
  )
}

export default Signup