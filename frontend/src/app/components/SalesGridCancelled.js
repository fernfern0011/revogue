import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import SalesCancelled from './SalesCancelled';
import '../styles/Order.css'
import { useSession } from 'next-auth/react';


export default function SalesGridCancelled() {
  const [saleItems, setsaleItems] = useState([]);
  const [error, setError] = useState(null);

  const {data: session} = useSession();
  let accID;
  if (session){
    console.log(session)
    accID = session.id;
    console.log(accID);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/get-cancelled-orders?sellerid=${accID}`)
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

  const items = saleItems.map((purchaseItem, index) => (
    <SalesCancelled key={index} purchaseItem={purchaseItem} />
  ));

  return (
    <Container className="test">
      {error ? (
        <div className='error-box'>
          <h1>No Cancelled Sales</h1>
        </div>
      ) : (
        <Row>{items}</Row>
      )}
    </Container>
  );
}
