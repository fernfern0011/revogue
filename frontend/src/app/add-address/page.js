"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import SidebarComponent from "../components/SidebarComponent";
import { useSession } from "next-auth/react";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

//style imports
import styles from "../page.module.css";
import "../styles/AddAddressComponent.css";
import { useRouter } from "next/navigation";

function AddAddressPage() {
  const { data: session } = useSession();
  let accID;
  const router = useRouter();

  if (session) {
    accID = session.id;
  } else {
    router.push('/error/403');
    return null;
  }

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    street: "",
    unit: "",
    phone: "",
    postal_code: "",
    delivery_instruction: "",
    isDefault: false,
    isBusiness: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      accid: accID,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }

    // Combine the form data with the account ID
    const addressData = {
      ...formData,
      accid: accID,
    };

    try {
      const response = await fetch(`https://revogue-backend.vercel.app/api/address/add-new-address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        alert("Address added successfully");
        setFormData({
          fname: "",
          lname: "",
          street: "",
          unit: "",
          phone: "",
          postal_code: "",
          delivery_instruction: "",
          isDefault: false,
          isBusiness: false,
        });
      } else {
        // Response status is not in the success range.
        alert("Failed to add an address");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main className={styles.main}>
      <Container fluid className="px-5 mt-5">
        <div className="breadcrumb">
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

          <Col lg="10" className="float-left mt-lg-0 mt-4">
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
                        className="custom"
                        type="text"
                        name="fname"
                        placeholder="First Name"
                        value={formData.fname}
                        required
                        onChange={handleChange}
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
                        className="custom"
                        type="text"
                        name="lname"
                        placeholder="Last Name"
                        value={formData.lname}
                        onChange={handleChange}
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
                        className="custom"
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={formData.street}
                        onChange={handleChange}
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
                      <Form.Control
                        className="custom"
                        type="text"
                        name="unit"
                        placeholder="Unit No"
                        value={formData.unit}
                        onChange={handleChange}
                      />
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
                        className="custom"
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
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
                        className="custom"
                        type="number"
                        name="postal_code"
                        placeholder="Postal Code"
                        value={formData.postal_code}
                        onChange={handleChange}
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
                        className="custom"
                        as="textarea"
                        rows={5}
                        name="delivery_instruction"
                        placeholder="Delivery Instruction"
                        value={formData.delivery_instruction}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col>
                    <FormGroup>
                      <Form.Check
                        className="custom-checkbox"
                        type="checkbox"
                        label="Set as Default Address"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <FormGroup>
                      <Form.Check
                        className="custom-checkbox"
                        type="checkbox"
                        label="Set as Business Address"
                        name="isBusiness"
                        checked={formData.isBusiness}
                        onChange={handleChange}
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
                    <Button className="cancel" onClick={() => router.push('/address')}>Cancel</Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default AddAddressPage;
