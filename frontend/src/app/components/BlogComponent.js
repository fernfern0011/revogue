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
import styles from "../page.module.css";
import "../styles/BlogComponent.css";

const BlogComponent = () => {
  return (
    <main className={styles.main}>
      <h1 style={{ textAlign: "center" }}>Our Blog</h1>

      <Container fluid>
        <Row className="mb-4 mx-2 justify-content-center">

           <Col xs="12" sm="6" md="4">
            <Card className="custom-card">
              <Card.Img variant="top" src="./pic1.png" />
              <Card.Body>
                <Card.Title>Blog Name</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col xs="12" sm="6" md="4">
            <Card className="custom-card">
              <Card.Img variant="top" src="./pic1.png" />
              <Card.Body>
                <Card.Title>WAHHHHHHHHHHH</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col xs="12" sm="6" md="4">
            <Card className="custom-card">
              <Card.Img variant="top" src="./pic1.png" />
              <Card.Body>
                <Card.Title>How To Thrift Like A Kween</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

       
      </Container>
    </main>
  );
};

export default BlogComponent;
