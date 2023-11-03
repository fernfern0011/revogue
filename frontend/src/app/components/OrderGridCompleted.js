import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import OrderCompleted from './OrderCompleted';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OrderGridCompleted() {
  const [purchaseItems, setPurchaseItems] = useState([]);
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
    fetch(`https://revogue-backend.vercel.app/api/mypurchases/get-completed-orders?buyerid=${accID}`)
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
    <OrderCompleted key={index} purchaseItem={purchaseItem} />
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
