import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Order from './Order'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OrderGridActive() {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [error, setError] = useState(null);

  const { data: session } = useSession();
  let accID;
  const router = useRouter();

  if (session) {
    accID = session.id;
  } {
    router.push('/error/403');
    return null;
  }

  useEffect(() => {
    fetch(`${process.env.backendUrl}/api/mypurchases/get-tobe-confirmed-orders?buyerid=${accID}`)
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
    <Order key={index} purchaseItem={purchaseItem} />
  ));

  return (
    <Container className="test">
      {error ? (
        <div className='error-box'>
          <h1>No Pending Orders</h1>
        </div>) : (
        <Row>{items}</Row>
      )}
    </Container>
  );
}



