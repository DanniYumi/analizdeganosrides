
import { UserAuth } from '../context/AuthContext';
import React, { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import '../styles/Account.css'
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore'
import PopUp from '../components/PopUp'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { async } from '@firebase/util';


const UserAccount = () => {
  const { user, logOut } = UserAuth()
  const [rides, setRides] = useState([])
  const [id, setId] = useState('')

  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [popupActive, setPopupActive] = useState(false)
  const [buttonPopUp, setButtonPopUp] = useState(false)

  const getRides = async () => {

    const citiesRef = collection(db, "rides");

// Create a query against the collection.
const q = query(citiesRef, where("uid", "==",user.uid));

const querySnapshot = await getDocs(q)
const data=[]
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  
  let val = doc.data()
  val.id = user.uid
  val.viewing = false

  data.push(val)
});
setRides(data)
  }

  
  useEffect(() => {
    getRides()

  }, [])
  const handleView = id => {
    const rideClone = [...rides]
    rideClone.forEach(ride => { 
      if (ride.id === id) {
        ride.viewing = !ride.viewing
      }
      else {
        ride.viewing = false
      }
    })
    setRides(rideClone)
  }


  const form = useRef()


  const sendMessage = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kkfmvad', 'template_g7t30p6', form.current, 'uNsEOEO4to8UWzV9r')
      .then((result) => {
        console.log(result.text);
        
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()

  };
  const handleSignOut = async () => {
    try {
      await logOut()
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div className='acc-container'>
        <div className='acc-tittle'>
          <h1>Welcome to your account</h1>
          <h3>Hello!</h3>
          <h3 className='acc-user'>{user?.displayName}</h3>
          <h3 className='acc-user'>{user && user.email}</h3>
        </div>
        <h3 className='see-history'>You can see all your requested rides here: </h3>
        <div className='view-rides'>
          {rides.map(ride => (
            <div className='view-ride' key={ride.id}>
              <h2 dangerouslySetInnerHTML={{ __html: ride.service }}></h2>
              {ride.viewing && <div>
                <h3>Start of the Ride: {ride.from}</h3>
                <h3>End of the Ride: {ride.to}</h3>
                <h3>Date: {ride.when}</h3>
                <h3>Addional comments: {ride.comment}</h3>

              </div>}
              <div className="viewBtn">
                <button className="view-btn" onClick={() => handleView(ride.id)}> View {ride.viewing ? 'less' : 'more'}</button>
              </div>

            </div>
          ))}
        </div>




        <button
          type="submit"
          onClick={() => setButtonPopUp(true)}
          className="cancelation-btn">Request cancelation</button>
        <PopUp
          trigger={buttonPopUp}
          setTrigger={setButtonPopUp}>
          <p>Any changes are subject to not being accepted by the company. Rates can change according to distance and date</p>
          <form ref={form}
        onSubmit={sendMessage}
        className='canc-form'>
          <div >

          <label className='label-form-canc'>Please confirm your email</label>
          <input
            placeholder="email"
            value={email}
            name="email"
            className='imput-container-canc'
            onChange={e => setEmail(e.target.value)}
            required />
        </div>
        <div className='ind-form-canc'>
          <label className='label-form-canc'>Let us know the reason for the request</label>
          <textarea 
            name="comments"
            value={comment}
            className='textarea-container-canc' 
            required
            onChange={e => setComment(e.target.value)}/>
        </div>
        <button className="request-btn">Request Cancelation</button>
        </form>
        </PopUp>

        <button className="signoutBtn" onClick={handleSignOut}>Sign Out</button>
      </div>



    </div>
  )
}

export default UserAccount