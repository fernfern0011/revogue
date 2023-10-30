"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Button from "@mui/material/Button";
import { BrowserRouter as Router } from "react-router";
import { NavLink } from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//style imports
import styles from "../page.module.css";
import "../styles/PersonalInfoComponent.css";

//retrieve data from backend API
async function getInfoData() {
  var accid = 1;
  const getInfoRes = await fetch(
    `http://localhost:5000/api/account?accid=${accid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const getInfoStatus = getInfoRes.status;
  if (getInfoStatus == 200) {
    return getInfoRes.json();
  }
}

async function PersonalInfoPage() {
  //load data from backend
  const infoData = await getInfoData();
  const info = infoData.data;

  // const [editableItem, setEditableItem] = useState(null);
  // const [username, setUsername] = useState(info[0].username); 
  // const [email, setEmail] = useState(info[0].accemail); 
  // const [password, setPassword] = useState(info[0].accpass); 

  return (
    <main className={styles.main}>
      <Container fluid className="mt-3 mb-5 px-5">
        <div>
          <p>
            Home &nbsp; {">"} &nbsp; Account Setting &nbsp; {">"} &nbsp;{" "}
            <b>Personal Info</b>
          </p>
        </div>

        <br></br>
        <Row className="d-flex">
          <Col lg="2">
            <SidebarComponent />
          </Col>

          {/* Personal info */}
          <Col lg="10" className="float-left custom">
            {info.map((accountData) => (
              <div key={accountData.accid}>

                {/* username */}
                <Row className="d-flex align-items-center">
                  <p>
                    <strong>Username</strong>
                  </p>
                  <div className="d-flex align-items-center ml-auto">
                    <Col>
                      <p className="mr-3">{accountData.username}</p>
                    </Col>

                    <Col></Col>
                    <Col className="d-flex align-items-center"></Col>
                  </div>
                </Row>
                <hr />

                 {/* username */}
                 <Row className="d-flex align-items-center mt-3">
                  <p>
                    <strong>Email</strong>
                  </p>
                  <div className="d-flex align-items-center ml-auto">
                    <Col>
                      <p className="mr-3">{accountData.accemail}</p>
                    </Col>

                    <Col></Col>
                    <Col className="d-flex align-items-center"></Col>
                  </div>
                </Row>
                <hr />

                {/* username */}
                <Row className="d-flex align-items-center mt-3">
                  <p>
                    <strong>Password</strong>
                  </p>
                  <div className="d-flex align-items-center ml-auto">
                    <Col>
                      <p className="mr-3">{accountData.accpass}</p>
                    </Col>

                    <Col></Col>
                    <Col className="d-flex align-items-center"></Col>
                  </div>
                </Row>
                <hr />

              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default PersonalInfoPage;
