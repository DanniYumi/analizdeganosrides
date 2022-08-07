
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../styles/Reviews.css'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import {RiCloseCircleLine} from 'react-icons/ri';

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [rate, setRate] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [popupActive, setPopupActive] = useState(false)
    const getReviews = () => {
        const reviewCollectionRef = collection(db, "reviews")
        getDocs(reviewCollectionRef)
            .then(response => {
                const rev = response.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                    viewing: false
                }))
                setReviews(rev)
            })
            .catch(error => console.log(error.message))
    }

    useEffect(() => {
        getReviews()

    }, [])
    const handleView = id => {
        const reviewClone = [...reviews]
        reviewClone.forEach(review => {
            if (review.id === id) {
                review.viewing = !review.viewing
            }
            else {
                review.viewing = false
            }
        })
        setReviews(reviewClone)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const reviewCollectionRef = collection(db, "reviews")
        addDoc(reviewCollectionRef, { name: name, comment: comment, rate: rate }).then(response => {
            console.log(response)
            
        }).catch(error => {
            console.log(error.message)
        })
         setComment(' ');
            setName('');
            setRate('');
    }

    return (
        <div className='review-container'>
            <div className='review-tittle'>
                <h1>Reviews</h1>

            </div>
            <div className='review-text'>
                <p>Have you ride with us before? Give us your feedback</p>
            </div>
            <div className='view-reviews'>
            {reviews.map(review => (
                        <div className='view-review' key={review.id}>
                            <h2 dangerouslySetInnerHTML={{ __html: review.comment }}></h2>

                            {review.viewing && <div>
                                <h3>Rate: {review.rate}</h3>
                                <h3>Name: {review.name}</h3>
                            </div>}

                            <div className="viewBtn">
                                <button className="view-btn"onClick={() => handleView(review.id)}> View {review.viewing ? 'less' : 'more'}</button>
                            </div>
                           
                        </div>
                    ))}
                </div>
           
            <button className='review-btn'onClick={() => setPopupActive(!popupActive)}>Write your Review</button>

            {popupActive && <div className='popup'>
                <div className='popup-inner'>
                     <button className='close-btn' onClick={()=> setPopupActive(false)}><RiCloseCircleLine color="#F3EEEE" size={30} /></button>
 <form
                onSubmit={handleSubmit}
                className='review-form'>
                <label>Name</label>
                <input type="text"
                    className='imput-container-review'
                    value={name}
                    onChange={e => setName(e.target.value)} />

                <label>From 1 to 10 what would it be your rate</label>
                <input type="text"
                    className='imput-container-review'
                    value={rate}
                    onChange={e => setRate(e.target.value)} />
                <label>Write your Review</label>
                <textarea
                    type="text"
                    className='textarea-container-review'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="send-btn-review">Send</button>

            </form>
            
                    </div>        
            </div >}


        </div>

    )
}

export default Reviews