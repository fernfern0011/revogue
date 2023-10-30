"use client"
import React, { useState, useEffect } from "react";
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

async function getAddressData() {

  // get product list
  const getAddressRes = await get(`${backendUrl}/api/product/get-all-products`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "accid": 1 })
  })

  const getAddressStatus = getAddressRes.status;
  if (getAddressStatus == 200) {
    return getAddressRes.json();
  }

}

async function AddressPage() {
  // const [addressData, setAddressData] = useState(null);

  // // Fetch address data when the component mounts
  // useEffect(() => {
  //   async function fetchAddressData() {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:5000/api/address/get-all-addresses",
  //         {
  //           method: "POST", // You mentioned that you need to use POST method
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ "accid": 1 }),
  //         }
  //       );

  //       if (response.status === 200) {
  //         const data = await response.json();
  //         console.log(data);
  //         setAddressData(data);
  //       } else {
  //         console.error("Error fetching address data.");
  //       }
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   }

  //   fetchAddressData();
  // }, []); // The empty dependency array ensures the effect runs only once on mount.
  const AddressData = await getAddressData();
  const addressList = AddressData.data;

  if(!addressList){
    return alert('failed');
  }

  console.log(addressList);

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

              <div className="jumbotron jumbotron-fluid custom-jumbotron">
                {addressData ? ( // Check if addressData is available
                  <div>
                    <h4>Name: {addressData.fname} {addressData.lname}</h4>
                    <p>Phone: {addressData.phone}</p>
                    <p>Street: {addressData.street}</p>
                    <p>Postal Code: {addressData.postal_code}</p>
                  </div>
                ) : (
                  <p>Loading address data...</p>
                )}
                {/* Additional address data goes here */}
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
    </main>
  );
}

export default AddressPage;
