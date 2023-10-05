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
              <Image src="holder.js/171x180" rounded />
              {/* <Col xs={10} md={10}>
                <Image src="holder.js/171x180" rounded />
              </Col> */}
            </Row>

            <Row className="mb-4 align-items-center">
              <h5>Sustainable Products</h5>
            </Row>

            <Row className="mb-4 align-items-center text-center">
              <p>
                Explore our carefully curated selection of sustainable products,
                each designed to reduce your carbon footprint
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
              <Image src="holder.js/171x180" rounded />
              {/* <Col xs={10} md={10}>
                <Image src="holder.js/171x180" rounded />
              </Col> */}
            </Row>

            <Row className="mb-4 align-items-center">
              <h5>Eco-Friendly Choices</h5>
            </Row>

            <Row className="mb-4 align-items-center text-center">
              <p>
                Make conscious choices with our eco-friendly products, knowing
                that your purchases promote ethical sourcing and responsible
                manufacturing practices.
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
              <Image src="holder.js/171x180" rounded />
              {/* <Col xs={10} md={10}>
                <Image src="holder.js/171x180" rounded />
              </Col> */}
            </Row>

            <Row className="mb-4 align-items-center">
              <h5>High Quality Selection</h5>
            </Row>

            <Row className="mb-4 align-items-center text-center">
              <p>
                Invest in long-lasting and reliable products that meet our
                stringent quality standards, ensuring your satisfaction and the
                longevity of your purchases.
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
              <Image src="holder.js/171x180" rounded />
              {/* <Col xs={10} md={10}>
                <Image src="holder.js/171x180" rounded />
              </Col> */}
            </Row>

            <Row className="mb-4 align-items-center">
              <h5>Sustainable Packaging</h5>
            </Row>

            <Row className="mb-4 align-items-center text-center">
              <p>
                Our sustainable packaging ensures that your orders arrive safely
                while minimizing their impact on the planet.
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ThriftingComponent;
