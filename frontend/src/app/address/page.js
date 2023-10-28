"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { BrowserRouter as Router } from "react-router";
import { NavLink } from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//style imports
import styles from "../page.module.css";
import "../styles/AddressComponent.css";

const AddressComponent = () => {
  return (
    <main className={styles.main}>
      <Navbar />

      <Container fluid className="mt-3 mb-5 px-5">
        <div>
          <p>
            Home &nbsp; {">"} &nbsp; Account Setting &nbsp; {">"} &nbsp;{" "}
            <b>Address</b>
          </p>
        </div>

        <br></br>
        <Row className="d-flex">
          <Col lg="2">
            <SidebarComponent />
          </Col>

          <Col lg="10" className="float-left">
            {/* current address */}
            <Row className="d-flex">
              <h4 className="title">Default address</h4>

              <br />

              <div className="jumbotron jumbotron-fluid custom-jumbotron">
                <h4>Name</h4>
                <p>postal</p>
                <p>address</p>
                <Row fluid>
                  <Col className="col-1">
                    <h4>
                      <span class="badge bg-secondary">Home</span>
                    </h4>
                  </Col>
                  <Col className="col-1">
                    <h4>
                      <span class="badge bg-secondary">
                        Default billing address
                      </span>
                    </h4>
                  </Col>
                  <Col className="col-11 col-sm-12"></Col>
                </Row>
                <br />
                <Button variant="text">Remove</Button>&nbsp;|&nbsp;
                <Button variant="text">Edit</Button>
              </div>
            </Row>

            <br></br>
            <div className="hr-custom">
            <hr></hr>

            </div>
            <br></br>

            {/* additional address */}
            <Row className="d-flex">
              <Col className="col-2">
                <h4 className="title">Additional address</h4>
              </Col>
              <Col className="col-8"></Col>
              <Col className="col-2">
                <Button variant="text" className="addBtn">
                  Add New +
                </Button>
              </Col>

              <br />

              <div className="jumbotron jumbotron-fluid custom-jumbotron">
                <h4>Name</h4>
                <p>postal</p>
                <p>address</p>
                <Row fluid>
                  <Col>
                    <h4>
                      <span className="badge bg-secondary">Tag</span>
                    </h4>
                  </Col>
                  {/* <Col>
                    <h4>
                      <span className="badge bg-secondary">
                        Default billing address
                      </span>
                    </h4>
                  </Col> */}
                </Row>
                <br />
                <Button variant="text">Remove</Button>&nbsp;|&nbsp;
                <Button variant="text">Edit</Button>&nbsp;|&nbsp;
                <Button variant="text">Set as default</Button>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer/>

    </main>
  );
};

export default AddressComponent;
