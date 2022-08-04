//import { createUserWithEmailAndPassword } from 'firebase/auth'
import React,{useState, useEffect} from 'react'
import{Link, useNavigate} from 'react-router-dom'
import{UserAuth} from'../context/AuthContext'
import {GoogleButton} from 'react-google-button';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState("");
  const [error, setError] = useState('')
  const {googleSignIn, user}= UserAuth(auth);

  const {createUser} = UserAuth();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')
    try{
      await  createUser(email, password)
      navigate('/account')
   }catch(e){
      setError(e.message)
     console.log(e.message)
   }
  }

  return (
    <div className='signin-container'>
      <div className='title-signup'>
      <h1>Don't have an account with us yet? If you do, go to </h1> <Link to='/signin'>Sign in</Link>
        </div>
        
        <form onSubmit={handleSubmit} className='form-box'>
          <div className='form-criterea'>
          <div className='form-label'>
          <label>Name</label>
          <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
          <label>Email</label>
          </div>
            <input 
            type="email" 
            onChange={(e)=>setEmail(e.target.value)} 
            className='form-input'
            required/>
          </div>
          <div className='form-criterea'>
          <div className='form-label'>
            <label>Password</label>
            </div>
            <input 
            type="password" 
            onChange={(e)=>setPassword(e.target.value)} 
            className='form-input'
            required/>
          </div>
          <button className='signInBTn'>Sign Up</button>
          <div>Would you like to Sign In with your Google Account?</div>
          <div className='googleBtn'>
          <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </form>
        
    </div>
  )
}

export default Signup