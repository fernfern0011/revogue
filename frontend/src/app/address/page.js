"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { BrowserRouter as Router } from "react-router";
import { NavLink } from "react-router-dom";
import SidebarComponentAddress from "../components/SidebarComponentAddress";

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
            <SidebarComponentAddress />
          </Col>

          <Col lg="10" className="float-left">
            {/* current address */}
            <Row className="d-flex mt-lg-0 mt-4">
              <h4 className="title">Default address</h4>

              <br />

              <div className="jumbotron jumbotron-fluid custom-jumbotron">
                <h5>Marci Fummons</h5>
                <p>8980252455</p>
                <p>1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road</p>
                <Row fluid>
                <Col className="col-1">
                  <h6>
                    <span className="badge">Home</span>
                  </h6>
                </Col>
                <Col className="col-1">
                  <h6>
                    <span className="badge">
                      Default billing address
                    </span>
                  </h6>
                </Col>
                  <Col className="col-10 col-sm-12"></Col>
                </Row>
                <br />
                <Button className="button" variant="text">Remove&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Button>
                <Button className="button" variant="text"> Edit</Button>
              </div>
            </Row>

            <br></br>
            <div className="hr-custom">
            <hr></hr>

            </div>
            <br></br>

            {/* additional address */}
            <Row className="d-flex">
              <Col className="col-6">
                <h4 className="title">Additional address</h4>
              </Col>
              <Col className="col-2"></Col>
              <Col className="col-4">
              <a href="add-address">
                <Button variant="text" className="addBtn">
                  Add New +
                </Button>
              </a>
              </Col>

              <br />

              <div className="jumbotron jumbotron-fluid custom-jumbotron">
                <h4>Name</h4>
                <p>postal</p>
                <p>address</p>
                <Row fluid>
                  <Col>
                    <h6>
                      <span className="badge">Office</span>
                    </h6>
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
                <Button className="button" variant="text">Remove&nbsp;&nbsp;|</Button>
                <Button className="button" variant="text"> Edit&nbsp;&nbsp;&nbsp;|</Button>
                <Button className="button" variant="text"> Set as default</Button>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AddressComponent;
