import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Purchase from './Purchase';
import '../styles/Order.css'
import { useSession } from 'next-auth/react';


export default function OrderGridActive() {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [error, setError] = useState(null);

  const {data: session} = useSession();
  let accID;
  if (session){
    console.log(session)
    accID = session.id;
    console.log(accID);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/mypurchases/get-to-receive-orders?buyerid=${accID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching product information');
        }
        return response.json();
      })
      .then((responseData) => {
        const purchaseItems = responseData.data;
        if (!Array.isArray(purchaseItems) || purchaseItems.length === 0) {
          throw new Error('No purchase items found.');
        }
        setPurchaseItems(purchaseItems);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const items = purchaseItems.map((purchaseItem, index) => (
    <Purchase key={index} purchaseItem={purchaseItem} />
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
