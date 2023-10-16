import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductListing from './ProductListing';

const ProductGrid = () => {
  // Generate an array of 9 elements to render the ProductListing component 9 times
  const products = Array.from({ length: 12 }, (_, index) => (
    <ProductListing key={index} />
  ));

  return (
    <Container className='test'>
      <Row>{products}</Row>
    </Container>
  );
};
    
export default ProductGrid;
