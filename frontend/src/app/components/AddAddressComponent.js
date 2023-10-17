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
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
// import Button from 'react-bootstrap/Button';

//style imports
import styles from "../page.module.css";
import "../styles/AddAddressComponent.css";

const AddAddressComponent = () => {
  return (
    <main className={styles.main}>
      <Container fluid>
        <div>
          <p>
            Home &nbsp; {">"} &nbsp; Account Setting &nbsp; {">"} &nbsp;{" "}
            <b>Add New Address</b>
          </p>
        </div>

        <br></br>
        <Row>
          <Col lg="2">
            <SidebarComponent />
          </Col>

          <Col lg="10" className="float-left">
            <h4 className="title">Add New Address</h4>

            <Container fluid>
              <Form className="custom-form p-4">
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">
                        First Name<span>*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">
                        Last Name<span>*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">
                        Country/Region<span>*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Country/Region" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">
                        Company Name
                      </Form.Label>
                      <Form.Control type="text" placeholder="Company Name" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">
                        Street Address<span>*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Street Address" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">Unit No</Form.Label>
                      <Form.Control type="text" placeholder="Unit No" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">
                        Phone Number<span>*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Phone Number" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">
                        Postal Code<span>*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Postal Code" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="custom-label">
                        Delivery Instruction
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Delivery Instruction"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col>
                    <FormGroup>
                      <Form.Check
                        type="checkbox"
                        label="Set as Default Shipping Address"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <FormGroup>
                      <Form.Check
                        type="checkbox"
                        label="Set as Default Billing Address"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Button variant="primary" className="custom-button">Save</Button>
                  </Col>
                  <Col>
                    <Button  className="cancel">Cancel</Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AddAddressComponent;
