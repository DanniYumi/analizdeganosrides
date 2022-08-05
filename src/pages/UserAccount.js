import React,{useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { db } from '../firebase'
import { query, collection, getDocs, where, onSnapshot } from "firebase/firestore";


const UserAccount = () => {
    const {user, logOut}=UserAuth()
 


  

    const handleSignOut = async()=>{
        try{
        await logOut()
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        {user?.displayName}
        {user && user.email}
        <div>{user.name}</div>
         <div>{user.name}</div>
        <button onClick={handleSignOut}>Sign Out</button>

    </div>
  )
}

export default UserAccount