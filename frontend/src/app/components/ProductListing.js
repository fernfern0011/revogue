
"use client"
import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import '../styles/ProductListing.css'

const ProductListing = ({ productid, productname, price, images }) => {
  return (
    <Col xs="12" sm="12" md="6" lg="4" className="px-2 pb-3" id={productid}>
      <Card className="card" style={{ width: "auto" }}>
        <Card.Img variant="top" src="/images/image5.png" alt={images} />
        <Card.Body>
          <Card.Title className="fs-6">{productname}</Card.Title>
          <Card.Text className="fs-6">
            <b>{price}</b>
          </Card.Text>
          <div className="text-center">
            <Button variant="contained" className="custom-button mx-auto">
              BUY NOW
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col >
  );
};

export default ProductListing;
