"use client";
import * as React from "react";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

//style imports
import styles from "../page.module.css";
import "../styles/ThriftingComponent.css";

const ThriftingComponent = () => {
  return (
    <main className={styles.main}>

      <Container fluid>
        <Row className="mt-4 justify-content-center">
          <Col>
            <Row>
              <Col xs={10} md={10}>
                <Image src="holder.js/171x180" rounded />
              </Col>
            </Row>

            

          </Col>

          <Col></Col>

          <Col></Col>

          <Col></Col>
        </Row>
      </Container>
    </main>
  );
};

export default ThriftingComponent;
