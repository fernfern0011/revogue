"use client";
// import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

//style imports
import "../styles/ProductsComponent.css";
import styles from "../page.module.css";

const ProductsComponent = () => {
  return (
    <main className={styles.main}>
      <h1 style={{ textAlign: "center" }}>Products</h1>

      <Container fluid>
        <Row className="mt-4 justify-content-center">
          <Col xs="auto">
            <Card style={{ width: "auto" }}>
              {/* <Image
                src={require("../images/pic1.png").default}
                alt=""
                fluid
            /> */}
              <Card.Img className="img-fluid" variant="top" src="./pic1.png" />
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

          <Col xs="auto">
            <Card style={{ width: "auto" }}>
              <Card.Img variant="top" src="./pic1.png" />
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

          <Col xs="auto">
            <Card style={{ width: "auto" }}>
              <Card.Img variant="top" src="./pic1.png" />
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
        </Row>

        {/* explore more button */}
        <Row className="mt-4 justify-content-center">
          <div className="text-center">
            <Button variant="contained" className="btn-black">
              EXPLORE MORE
            </Button>
          </div>
        </Row>
      </Container>
    </main>
  );
};

export default ProductsComponent;
