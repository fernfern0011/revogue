"use client"
import React, { useEffect, useState } from 'react';
import MapComponent from './Maps';


function Home() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => { 
    // Fetch data from your backend endpoint
    fetch('http://localhost:5000/api/address/get-all-businesses')
      .then((response) => response.json())
      .then((data) => setBusinesses(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='d-flex justify-content-center flex-column container-fluid text-center page-container'>
      <h1>Business Locations</h1>
      <br></br>
      <div className='map-container'>
        <MapComponent businesses={businesses}/>
      </div>
      
    </div>
  );
}

export default Home;
