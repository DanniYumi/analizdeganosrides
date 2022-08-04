import React,{useState} from 'react'
import FaqDrop from '../components/FaqDrop'
import '../styles/Faq.css'

const Faq = () => {
    const[faqs, setfaqs]=useState([
        {
            question:'How do I book a ride?',
            answer:'You go in to the Rides page, insert all the information about the service you are looking for and we are going to get in touch with you as soon as possible through email',
            open:true
        },
        {
            question:'How do I know my ride was booked?',
            answer:'After inserting the details for the service, we are going to send you an email with payment information, as soon as the payment is done, you are going to receive an email with your invoice and the ride confirmation.',
            open:false
        },
        {
            question:'Are the prices the one listed in the Services?',
            answer:'As stated in the table, those are the starting prices for each service, they might go higher depending on the distance and how long it will take',
            open:false
        },
        {
            question:'Can I book the same service every week?',
            answer:'If it is something you wish, you can write that in the message and we will get back to you.',
            open:false
        },
    ])
    const toggleFaq= index =>{
        setfaqs(faqs.map((faq,i)=>{
            if(i=== index){
                faq.open = !faq.open
            }
            else{
                faq.open=false;
            }
            return faq
        }))
    }
  return (
    <div className='faq-container'>
        <div className='faq-title'>
            <h1>FAQ'S</h1>
        </div>
        {faqs.map((faq,i)=>(
            <FaqDrop faq={faq} index={i} toggleFaq={toggleFaq}/>
        )
        )}
    </div>
  )
}

export default Faq