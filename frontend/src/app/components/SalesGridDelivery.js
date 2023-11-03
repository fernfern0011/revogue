import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import SalesDelivery from './SalesDelivery';
import '../styles/Order.css'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OrderGridActive() {
  const [saleItems, setsaleItems] = useState([]);
  const [error, setError] = useState(null);

  const { data: session } = useSession();
  let accID;
  const router = useRouter();

  if (session) {
    accID = session.id;
  } else {
    router.push('/error/403');
    return null;
  }

  useEffect(() => {
    fetch(`https://revogue-backend.vercel.app/api/mysales/get-to-ship-orders?sellerid=${accID}`)
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


