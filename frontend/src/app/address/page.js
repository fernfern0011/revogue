"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { BrowserRouter as Router } from "react-router";
import { NavLink } from "react-router-dom";
import SidebarComponentAddress from "../components/SidebarComponentAddress";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SidebarComponent from "../components/SidebarComponent";
import styles from "../page.module.css";
import "../styles/AddressComponent.css";
import {useSession} from "next-auth/react";

function AddressPage() {
  const {data: session} = useSession();
  let accID;
  if (session){
    accID = session.id;
    console.log(accID);
  }
  else{
    console.log('No session')
  }

  //default address
  const [defaultAddress, setDefaultAddress] = useState(null);
  useEffect(() => {
    const accid = 1;
    fetch(
      `https://revogue-backend.vercel.app/api/address/get-default-address?accid=${accid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch cart data");
        }
      })
      .then((data) => {
        console.log(data.data);
        setDefaultAddress(data.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);
  console.log(defaultAddress);

  //additional address
  const [additional, setAdditional] = useState(null);
  useEffect(() => {
    const accid = 1;
    fetch(
      `https://revogue-backend.vercel.app/api/address/get-all-addresses?accid=${accid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch cart data");
        }
      })
      .then((data) => {
        // console.log(data.data);
        const nonDefaultAddresses = data.data.filter((data) => !data.isdefault);
        setAdditional(nonDefaultAddresses);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);
  console.log(additional);

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

              {defaultAddress ? (
                defaultAddress.map((data, index) => (
                  <div className="jumbotron jumbotron-fluid custom-jumbotron">
                    <div key={index}>
                      <h4>
                        {data.fname} {data.lname}
                      </h4>
                      <br></br>
                      {/* <p>{data.addressid}</p> */}
                      <p>{data.phone}</p>
                      <p>{data.street}</p>
                      <p>{data.postal_code}</p>
                      <Row fluid>
                        <Col>
                          <h4>
                            <span className="badge bg-secondary">Default</span>
                          </h4>
                        </Col>
                      </Row>
                      <br />
                    </div>
                    <Button variant="text">Remove</Button>&nbsp;|&nbsp;
                    <Button variant="text">Edit</Button>&nbsp;
                  </div>
                ))
              ) : (
                <p>Loading data...</p>
              )}
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

              {additional ? (
                additional.map((data) => (
                <div className="jumbotron jumbotron-fluid custom-jumbotron mb-3">
                  <div key={data.addressid}>
                    <h4>
                      {data.fname} {data.lname}
                    </h4>
                    <br/>
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
               ))
               ) : (
                <p>Loading data...</p>
               )}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default AddressPage;
