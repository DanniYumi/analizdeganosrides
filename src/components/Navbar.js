
import Logo from '../assets/logo.png'
import {Link} from "react-router-dom"
import React,{useState} from 'react'
import '../styles/Navbar.css';
import { RiUserFill } from 'react-icons/ri';
import {AiOutlineMenu} from 'react-icons/ai';
import {RiCloseCircleLine} from 'react-icons/ri';
import{UserAuth} from '../context/AuthContext'




const Navbar = () => {
    const [showMenu, setShowMenu]=useState(false);
    const [showLogin, setShowLogin]=useState(false);
    const {user,logOut}=UserAuth()

    const toggleMenu =()=>{
        setShowMenu(!showMenu);
    }
    const toggleUser =()=>{
    setShowLogin(!showLogin);
    
}
const handleSignOut = async()=>{
  try{
  await logOut()
  }
  catch(error){
      console.log(error)
  }
}

  return (
    <div className="navbar">
     <div className="leftSide" id={showMenu ? "open" : "close"}>
     <Link to="/"> <img src={Logo}/> </Link>
  
       <div className="hiddenLinks">
           <Link to="/"> Home </Link>
            <Link to="/rides"> Rides</Link>
           <Link to="/services"> Services </Link>
            <Link to="/about"> About Us </Link>
           <Link to="/contact"> Contact Us</Link>
         <div className='nav-bar-user' id={showLogin ? "nav-link-show": "nav-link-hide"}>
                   <Link to="/signin">Sign In</Link>
                   <Link to="/signup">Sign up</Link>
                  
                  
               </div>
       </div>
       <div className="rightSide">
       <Link to="/rides"> Rides</Link>
       <Link to="/services"> Services </Link>
       <Link to="/about"> About Us </Link>
       <Link to="/contact"> Contact Us</Link>
       <div className='nav-bar-user' id={showLogin ? "nav-link-show": "nav-link-hide"}>
                   <Link to='/signin'>Sign in</Link>
                   <Link to="/signup">Sign Up</Link>
                   <button onClick={handleSignOut} >Log Out</button>
                  
                  
                  
               </div>
               <button onClick={toggleMenu}>
       {
                   showMenu ?<RiCloseCircleLine color="#234945" size={30}/>: < AiOutlineMenu color="#234945" size={30}/>}
       </button>
     </div>
   
   </div>
       <div className='userIcon'>
       {user? (
       <button onClick={handleSignOut}>Logout</button>
     ) : (
       <Link to='/signin'>< RiUserFill  color="#234945" size={30}/></Link>
     )}
       </div>
     
   </div>
   
  )
}

export default Navbar