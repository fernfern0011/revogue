import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Order from './Order';

const OrderGrid = () => {
  // Generate an array of 9 elements to render the ProductListing component 9 times
  const orders = Array.from({ length: 12 }, (_, index) => (
    <Order key={index} />
  ));

  return (
    <Container className='test'>
      <Row>{orders}</Row>
    </Container>
  );
};
    
export default OrderGrid;