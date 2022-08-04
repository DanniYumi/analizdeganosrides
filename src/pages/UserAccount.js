import React,{useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const UserAccount = () => {
    const {user, logOut}=UserAuth()
    const [bookings, setBookings]=useState([])
    const[bookingForm, setBookingForm]=useState({
      name:"",
      email:"",
      from:"",
      to:"",
      when:"",
      service:"",
      comments:""
    })
    const bookingsCollectionRef =collection(db, "bookings")
  useEffect(()=>{
    onSnapshot(bookingsCollectionRef, snapshot =>{
        setBookings(snapshot.docs.map(doc=>{
          return{
            id:doc.id,
            viewing:false,
            ...doc.data()
          }
        }))
    })
  },
  [])

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
        <button onClick={handleSignOut}>Sign Out</button>
        <div className='userBookings'>
        {bookings.map((bookings,i)=>(
          <div className='bookings' key={bookings.id}>
           <h2>{bookings.name}</h2> 
           <p dangerouslySetInnerHTML={{__html: bookings.desc}}></p>
           <div>
            <h4>Your ride</h4>
            <h2>{bookings.email}</h2> 
          </div>
          </div>
        ))}
        
    </div>
    </div>
  )
}

export default UserAccount