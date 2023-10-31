import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

export default function MapsComponent() {
  const defaultCenter = [1.296568, 103.852119]; // Default center
  const [businesses, setBusinesses] = useState([]);
  const [userLocation, setUserLocation] = useState({lat: 0, lon: 0});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/businesses');
        const businessData = response.data;

        const geocodedBusinesses = await Promise.all(
          businessData.map(async (business) => {
            const address = encodeURIComponent(business.address);
            try {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
              );
              const data = response.data;
              if (data && data.length > 0) {
                const { lat, lon } = data[0];
                return {
                  ...business,
                  latitude: parseFloat(lat),
                  longitude: parseFloat(lon),
                };
              }
            } catch (error) {
              console.error(`Error geocoding address "${business.address}":`, error);
              return null;
            }
          })
        );

        const validBusinesses = geocodedBusinesses.filter((business) => business !== null);
        setBusinesses(validBusinesses);
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchBusinesses();
  }, []);

  // let customIconDefault = null;
  // let customIconClose = null;

  // if (typeof window !== 'undefined') {
    let defaultIcon = L.icon({
      iconUrl: 'static/images/main_marker.png', // Specify the URL to your default marker image
      iconSize: [40 * 0.6, 59 * 0.6], // Adjust the size based on your marker image
      iconAnchor: [20 * 0.6, 59 * 0.6], // Adjust the anchor point
      popupAnchor: [0 * 0.6, -59 * 0.6], // Adjust the popup anchor
    });

    let closeIcon = L.icon({
      iconUrl: 'static/images/close_marker.png', // Specify the URL to your close marker image
      iconSize: [40 * 0.6, 59 * 0.6], // Adjust the size based on your marker image
      iconAnchor: [20 * 0.6, 59 * 0.6], // Adjust the anchor point
      popupAnchor: [0 * 0.6, -59 * 0.6], // Adjust the popup anchor
    });

    let myLocation = L.icon({
      iconUrl: 'static/images/mylocation.png', // Specify the URL to your close marker image
      iconSize: [20, 20], // Adjust the size based on your marker image
      iconAnchor: [10, 10], // Adjust the anchor point
      popupAnchor: [0, -20], // Adjust the popup anchor
    });

    
  //}

  const inRadiusBusinesses = businesses.filter((business) => {
    if (userLocation) {
      const R = 6371;
      const lat1 = userLocation.lat;
      const lon1 = userLocation.lon;
      const lat2 = business.latitude;
      const lon2 = business.longitude;

      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance <= 5;
    }
    return false;
  });

  return (
    <MapContainer center={defaultCenter} zoom={12} style={{ width: '100%', height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {businesses.map((business, index) => (
        <Marker
          key={index}
          position={[business.latitude, business.longitude]}
          icon={inRadiusBusinesses.includes(business) ? closeIcon : defaultIcon}
        >
          <Popup>
            <strong>{business.name}</strong>
            <br />
            {business.address}
            <br />
            <button onClick={() => handleViewDetails(business)}>View Details</button>
          </Popup>
        </Marker>
      ))}

      if(userLocation){
        <Marker icon={myLocation} position={userLocation}></Marker>
      }
    </MapContainer>
  );
}

function handleViewDetails(business) {
  console.log('View Details clicked for:', business);
}
