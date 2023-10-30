import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet'; // Import Leaflet

export default function MapComponent() {
  const defaultCenter = [1.296568, 103.852119]; // Default center
  const [businesses, setBusinesses] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    // Fetch business data from your backend endpoint
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/businesses');
        const businessData = response.data;

        // Geocode addresses using Nominatim
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

        // Filter out businesses with valid coordinates
        const validBusinesses = geocodedBusinesses.filter((business) => business !== null);

        // Update state with the valid businesses
        setBusinesses(validBusinesses);
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    // Call the function to fetch and geocode businesses when the component mounts
    fetchBusinesses();
  }, []);

  // Define the custom icons
  const defaultIcon = L.icon({
    iconUrl: 'static/images/black_marker.png',
    iconSize: [38, 25], // Adjust the size based on your marker image
    iconAnchor: [22, 94], // Adjust the anchor point
    popupAnchor: [-3, -76], // Adjust the popup anchor
  });

  const closeIcon = L.icon({
    iconUrl: 'static/images/marker.jpg',
    iconSize: [38, 25], // Adjust the size based on your marker image
    iconAnchor: [22, 94], // Adjust the anchor point
    popupAnchor: [-3, -76], // Adjust the popup anchor
  });

  const inRadiusBusinesses = businesses.filter((business) => {
    if (userLocation) {
      // Calculate distance using the Haversine formula
      const R = 6371; // Earth's radius in km
      const lat1 = userLocation.latitude;
      const lon1 = userLocation.longitude;
      const lat2 = business.latitude;
      const lon2 = business.longitude;

      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance <= 5; // Check if the business is within 10 km of the user
    }
    return false; // If user location is not available, exclude the business
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
    </MapContainer>
  );
}

function handleViewDetails(business) {
  // Implement your logic for showing business details here
  // You can open a modal, navigate to a new page, or take any other action
  console.log('View Details clicked for:', business);
}
