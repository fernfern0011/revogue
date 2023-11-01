"use client";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//style imports
import styles from "../styles/LandingPage.css";

const LandingComponent = () => {
  return (
    <main className={styles.main}>
      <Container fluid>
        <Row className="d-flex align-items-center mb-4 mx-2">
          <Col xs="12" md="6">
            <h1>
              <b>Welcome to ReVogue</b>
            </h1>
            <p style={{ fontSize: 30 }}>Your Sustainable</p>
            <h1 className="coloring fw-bold">Shopping</h1>
            <h1 className="coloring fw-bold">Destination</h1>
            <p>"Discover Sustainability. Embrace Greenify.</p>
            <p>Your Eco-Friendly Haven for Conscious Shopping."</p>
            <Button variant="contained" className="custom-button">
              SHOP NOW
            </Button>
          </Col>

          <Col xs="12" md="6">
            <div className="d-flex justify-content-center">
              <Image
                className="img-fluid"
                src="/images/pic1.png"
                alt=""
                width={700}
                height={700}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default LandingComponent;
