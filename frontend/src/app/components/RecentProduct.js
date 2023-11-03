import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


//style imports
import "../styles/ProductsComponent.css";
import Link from "next/link";

function RecentProduct({ productList }) {

  var image;
  var id = productList.productid;
  if (productList.images) {
    const itemImages = productList.images.split(',');
    image = itemImages[0];
  }

  return (
    <Col xs="12" sm="6" md="4" id={productList.productid}>
      <Link href={{ pathname: `/shop/${id}` }}>
        <Card className="card" style={{ width: "auto" }}>
          <Card.Img className="img-fluid" variant="top" src={image ? image : '/images/image5.png'} />
          <Card.Body>
            <Card.Title>{productList.productname}</Card.Title>
            <Card.Text>
              <b>{productList.price}</b>
            </Card.Text>
            <div className="text-center">
              <Button variant="contained" className="custom-button mx-auto">
                BUY NOW
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default RecentProduct;
