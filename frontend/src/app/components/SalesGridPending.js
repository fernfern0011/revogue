import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import SalesPending from './SalesPending';
import '../styles/Order.css'
import { useSession } from 'next-auth/react';


export default function SalesGridPending() {
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
    fetch(`http://localhost:5000/api/mysales/get-inprogress-orders?sellerid=${accID}`)
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
    <SalesPending key={index} saleItem={saleItem} />
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
