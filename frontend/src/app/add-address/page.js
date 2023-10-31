"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { BrowserRouter as Router } from "react-router";
import { NavLink } from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";

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
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <main className={styles.main}>

      <Container fluid className="px-5 mt-5">
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
              <Form
                className="custom-form p-4"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Row className="mb-3">
                  <Col lg={6}>
                    <Form.Group controlId="validationCustom01">
                      <Form.Label className="custom-label">
                        First Name<span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        First name is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group controlId="validationCustom02">
                      <Form.Label className="custom-label">
                        Last Name<span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Last name is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg={6}>
                    <Form.Group controlId="validationCustom04">
                      <Form.Label className="custom-label">
                        Street Address<span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Street Address"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Street Address is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label className="custom-label">Unit No</Form.Label>
                      <Form.Control type="text" placeholder="Unit No" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg={6}>
                    <Form.Group controlId="validationCustom05">
                      <Form.Label className="custom-label">
                        Phone Number<span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Phone number is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group controlId="validationCustom05">
                      <Form.Label className="custom-label">
                        Postal Code<span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Postal Code"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Postal code is required.
                      </Form.Control.Feedback>
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
                    <Button
                      type="submit"
                      variant="primary"
                      className="custom-button"
                    >
                      Save
                    </Button>
                  </Col>
                  <Col>
                    <Button className="cancel">Cancel</Button>
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
