"use client"
import React, { useEffect, useState } from 'react';
import MapComponent from './components/Maps.js';


function Home() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => { 
    // Fetch data from your backend endpoint
    fetch('http://localhost:3001/businesses')
      .then((response) => response.json())
      .then((data) => setBusinesses(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Business Locations</h1>
      <br></br>
      <MapComponent businesses={businesses}/>
    </div>
  );
}

export default Home;
