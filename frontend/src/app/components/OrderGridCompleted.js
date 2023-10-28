import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Order from './OrderCompleted';

const OrderGridCompleted = () => {
  // Generate an array of 9 elements to render the ProductListing component 9 times
  const orders = Array.from({ length: 3 }, (_, index) => (
    <Order key={index} />
  ));

  return (
    <Container className='test'>
      <Row>{orders}</Row>
    </Container>
  );
};
    
export default OrderGridCompleted;