
import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import '../styles/ProductListing.css'

const ProductListing = () => {
  return (
    <Col xs="12" sm="6" md="4" className="px-2 pb-3">
      <Card className="card" style={{ width: "auto" }}>
        <Card.Img variant="top" src="/images/image5.png" />
        <Card.Body>
          <Card.Title>Raven Hoodie With Black colored Design</Card.Title>
          <Card.Text>
            <b>$19.99</b>
          </Card.Text>
          <div className="text-center">
            <Button variant="contained" className="custom-button mx-auto">
              BUY NOW
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductListing;
