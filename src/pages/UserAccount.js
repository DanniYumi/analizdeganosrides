
import { UserAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../styles/Account.css'
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore'
import PopUp from '../components/PopUp'
import{Link} from 'react-router-dom'


const UserAccount = () => {
  const { user, logOut } = UserAuth()
  const [rides, setRides] = useState([])
  const [id, setId] = useState('')
  const [costumers, setCostumers] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [buttonPopUp, setButtonPopUp] = useState(false)

  const getRides = () => {
    const ridesCollectionRef = collection(db, "rides")
    getDocs(ridesCollectionRef)
      .then(response => {
        const rid = response.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          viewing: false
        }))
        setRides(rid)
      })
      .catch(error => console.log(error.message))
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

                <Link className='singinbtn'to='/rides'>Request an update</Link>
                   <button
                  type="submit"
                  onClick={() => setButtonPopUp(true)}
                  className="send-btn">Request cancelation</button>
                <PopUp
                  trigger={buttonPopUp}
                  setTrigger={setButtonPopUp}>
                  <p>Any changes are subject to not being accepted by the company. Rates can change according to distance and date</p>
                </PopUp>
              </div>}

              <div className="viewBtn">
                <button className="view-btn" onClick={() => handleView(ride.id)}> View {ride.viewing ? 'less' : 'more'}</button>
              </div>

            </div>
          ))}
        </div>




        <button className="signoutBtn" onClick={handleSignOut}>Sign Out</button>
      </div>



    </div>
  )
}

export default UserAccount