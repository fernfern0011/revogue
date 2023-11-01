"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { BrowserRouter as Router } from "react-router";
import { NavLink } from "react-router-dom";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SidebarComponent from "../components/SidebarComponent";
import styles from "../page.module.css";
import "../styles/AddressComponent.css";

//retrieve default data from backend API
async function getDefaultAddressData() {
  var accid = 1;
  const getDefaultAddressRes = await fetch(
    `https://revogue-backend.vercel.app/api/address/get-default-address?accid=${accid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const getDefaultAddressStatus = getDefaultAddressRes.status;
  if (getDefaultAddressStatus == 200) {
    return getDefaultAddressRes.json();
  }
}

//retrieve additional data from backend API
async function getAddressData() {
  var accid = 1;
  const getAddressRes = await fetch(
    `https://revogue-backend.vercel.app/api/address/get-all-addresses?accid=${accid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const getAddressStatus = getAddressRes.status;
  if (getAddressStatus == 200) {
    return getAddressRes.json();
  }
}

async function AddressPage() {
  console.log(process.env.backendUrl);
  //load default data
  const defaultData = await getDefaultAddressData();
  const defaultAddr = defaultData.data;

  //load additional default data
  const addressData = await getAddressData();
  const addresses = addressData.data;

  // Filter addresses where isdefault is false
  const nonDefaultAddresses = addresses.filter((data) => !data.isdefault);

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
            <SidebarComponent />
          </Col>

          <Col lg="10" className="float-left">
            {/* current address */}
            <Row className="d-flex">
              <h4 className="title">Default address</h4>

              <br />

              {defaultAddr.map((data, index) => (
                <div className="jumbotron jumbotron-fluid custom-jumbotron">
                  <div key={index}>
                    <h4>
                      {data.fname} {data.lname}
                    </h4>
                    <br></br>
                    <p>{data.phone}</p>
                    <p>{data.street}</p>
                    <p>{data.postal_code}</p>
                  </div>
                  <Row fluid>
                    <Col>
                      <h4>
                        <span className="badge bg-secondary">Default</span>
                      </h4>
                    </Col>
                  </Row>
                  <br />
                  <Button variant="text">Remove</Button>&nbsp;|&nbsp;
                  <Button variant="text">Edit</Button>&nbsp;
                </div>
              ))}
            </Row>

            <br></br>
            <div className="hr-custom">
              <hr></hr>
            </div>
            <br></br>

            {/* additional address */}
            <Row className="d-flex">
              <Col className="col-3">
                <h4 className="title">Additional Address</h4>
              </Col>
              <Col className="col-6"></Col>
              <Col className="col-2">
                <Button variant="text" className="addBtn">
                  Add New +
                </Button>
              </Col>

              <br />

              {nonDefaultAddresses.map((data) => (
                <div className="jumbotron jumbotron-fluid custom-jumbotron mb-3">
                  <div key={data.addressid}>
                    <h4>
                      {data.fname} {data.lname}
                    </h4>
                    <br></br>
                    {/* <p>{data.addressid}</p> */}
                    <p>{data.phone}</p>
                    <p>{data.street}</p>
                    <p>{data.postal_code}</p>
                  </div>
                  <Row fluid>
                    <Col>
                      <h4>
                        <span className="badge bg-secondary">
                          {data.isbusiness ? "Business" : "Additional"}
                        </span>
                      </h4>
                    </Col>
                  </Row>
                  <br />
                  <Button variant="text">Remove</Button>&nbsp;|&nbsp;
                  <Button variant="text">Edit</Button>&nbsp;|&nbsp;
                  <Button variant="text">Set as default</Button>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default AddressPage;
