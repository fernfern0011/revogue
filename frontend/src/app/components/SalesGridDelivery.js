import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import SalesDelivery from './SalesDelivery';
import '../styles/Order.css'

export default function OrderGridActive() {
  const [saleItems, setsaleItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/mysales/get-to-ship-orders?sellerid=1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching product information');
        }
        return response.json();
      })
      .then((responseData) => {
        const saleItems = responseData.data;
        if (!Array.isArray(saleItems) || saleItems.length === 0) {
          throw new Error('No purchase items found.');
        }
        setsaleItems(saleItems);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const items = saleItems.map((saleItem, index) => (
    <SalesDelivery key={index} saleItem={saleItem} />
  ));

  return (
    <Container className="test">
      {error ? (
        <div className='error-box'>
          <h1>No Pending Orders</h1>
        </div>
      ) : (
        <Row>{items}</Row>
      )}
    </Container>
  );

}


