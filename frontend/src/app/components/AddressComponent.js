"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { BrowserRouter as Router } from "react-router";
import { NavLink } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";

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
      <Container fluid>
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
              <h5>Default address</h5>

              <br />

              <div class="jumbotron jumbotron-fluid">
                <h4>Name</h4>
                <p>postal</p>
                <p>address</p>
                
                <Row fluid>

                <h4><span class="badge bg-secondary">Home</span></h4>
                <h4><span class="badge bg-secondary">Default billing address</span></h4>
                </Row>
                <br />

                <Button variant="text">
                  Remove
                </Button>{" "}
                |
                <Button variant="text" >
                  Edit
                </Button>
              </div>

            </Row>

          </Col>
        </Row>
      </Container>

      {/* this page */}
    </main>
  );
};

export default AddressComponent;
