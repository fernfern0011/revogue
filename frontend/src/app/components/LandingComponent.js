"use client";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//style imports
import styles from "../page.module.css";
import "../styles/LandingPage.css";

const LandingComponent = () => {
  return (
    <main className={styles.main}>
      
      <Container fluid>
        <Row className="mb-4 mx-2">
          <Col xs="12" md="6">
            <h1>
              <b>Welcome to ReVogue</b>
            </h1>
            <p style={{ fontSize: 30 }}>Your Sustainable</p>
            <h1 className="coloring">Shopping</h1>
            <h1 className="coloring">Destination</h1>
            <p>"Discover Sustainability. Embrace Greenify.</p>
            <p>Your Eco-Friendly Haven for Conscious Shopping."</p>
            <Button variant="contained" className="custom-button">
              SHOP NOW
            </Button>
          </Col>

          <Col xs="12" md="6">
            <div className="float-end">
              <Image
                className="img-fluid"
                src="/images/pic1.png"
                width={700}
                height={500}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* first part  */}
      {/* <div className="landing-page">

        <div className="left-div">
          <h1>
            <b>Welcome to ReVogue</b>
          </h1>
          <p>Your Sustainable</p>
          <h1 className={styles.coloring}>Shopping</h1>
          <h1 className={styles.coloring}>Destination</h1>

          <p>
            "Discover Sustainability. Embrace Greenify. Your Eco-Friendly Haven
            for Conscious Shopping."
          </p>
          <Button variant="contained" className="custom-button">
            SHOP NOW
          </Button>
        </div> */}

      {/* <div className="right-div"> */}
      {/* <p>{test}</p> */}
      {/* <img src="../image/pic1.png" alt="" /> */}
      {/* <Image
            src="/images/pic1.png"
            width={500}
            height={500}
            alt=""
          />
        </div> */}

      {/* </div> */}
    </main>
  );
};

export default LandingComponent;
