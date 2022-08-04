import React from 'react'
import '../styles/Service.css'

const Service = () => {
  return (
    <div className="container-service">
      <div className='service-title'>
      <h1>Services we provide</h1>
      </div>
      <div className='services-table'>
      <table>
        <thead>
          <tr>
            <th>Type of Service</th>
            <th> Description</th>
            <th> Starting Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Airport Shuttle</th>
            <th>If you are looking for a ride to, from or round trip to the airport.</th>
            <th>$50.00</th>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <th>Quick Rides</th>
            <th>If you need to run some quick errants and need a quick ride around.</th>
            <th>$10.00</th>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <th>Tourism</th>
            <th>If you are looking forward to know somewhere around Victoria and need a ride for the day.</th>
            <th>$100.00</th>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <th>Interstate</th>
            <th>If you need to go somewhere outside Victoria, this is the service you are looking for</th>
            <th>$100.00</th>
          </tr>
          </tbody>
      </table>
      </div>
    </div>
  )
}

export default Service