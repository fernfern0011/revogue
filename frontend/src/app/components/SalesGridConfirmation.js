import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import SalesConfirmation from './SalesConfirmation';
import '../styles/Order.css'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SalesGridConfirmation() {
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
    fetch(`${process.env.backendUrl}/api/mysales/get-new-orders?sellerid=${accID}`)
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
    <SalesConfirmation key={index} saleItem={saleItem} />
  ));

  return (
    <Container className="test">
      {error ? (
        <div className='error-box'>
          <h1>No Sales to Confirm</h1>
        </div>
      ) : (
        <Row>{items}</Row>
      )}
    </Container>
  );
}
