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
        <Row className="mb-4 mx-2 justify-content-center">
          <Col
            xs="12"
            sm="6"
            md="3"
            className="d-flex flex-column align-items-center"
          >
            <Row className="mb-4 align-items-center">
              <Col xs={10} md={10}>
                <Image className="image" src="/images/image1.png" rounded />
              </Col>
            </Row>

            <Row className="mb-4 align-items-center">
              <h5>An Eco-friendly Choice</h5>
            </Row>

            <Row className="mb-4 align-items-center text-center">
              <p>
              92 million tons of garments produced every year land in massive dumping grounds. By shopping secondhand, you're helping to reduce the amount of waste that ends up in landfills.
              </p>
            </Row>
          </Col>

          <Col
            xs="12"
            sm="6"
            md="3"
            className="d-flex flex-column align-items-center"
          >
            <Row className="mb-4 align-items-center">
              <Col xs={10} md={10}>
                <Image className="image" src="/images/image2.png" rounded />
              </Col>
            </Row>

            <Row className="mb-4 align-items-center">
              <h5>Saving Resources</h5>
            </Row>

            <Row className="mb-4 align-items-center text-center">
              <p>
                Quadrupling the average life span of an item of clothing results in 75% savings in freshwater used for dyeing and other processes. 
              </p>
            </Row>
          </Col>

          <Col
            xs="12"
            sm="6"
            md="3"
            className="d-flex flex-column align-items-center"
          >
            <Row className="mb-4 align-items-center">
              <Col xs={10} md={10}>
                <Image className="image" src="/images/image3.png" rounded />
              </Col>
            </Row>

            <Row className="mb-4 align-items-center">
              <h5>Lower Carbon Footprint</h5>
            </Row>

            <Row className="mb-4 align-items-center text-center">
              <p>
                Extending the average life of clothes by just three months of active use per item leads to a 5-10% reduction in each item's carbon, water and waste footprints.
              </p>
            </Row>
          </Col>

          <Col
            xs="12"
            sm="6"
            md="3"
            className="d-flex flex-column align-items-center"
          >
            <Row className="mb-4 align-items-center">
              <Col xs={10} md={10}>
                <Image className="image" src="/images/image4.png" rounded />
              </Col>
            </Row>

            <Row className="mb-4 align-items-center">
              <h5>Low Effort, High Impact</h5>
            </Row>

            <Row className="mb-4 align-items-center text-center">
              <p>
              If every consumer this year bought just one secondhand garment instead of a new one, it would lower CO2 emissions by over 2 billion pounds, or take 76 million cars off the road for a day. 
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ThriftingComponent;
