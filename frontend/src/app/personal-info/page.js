"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import SidebarComponent from "../components/SidebarComponent";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
// import Sidebar from './sidebar';

//style imports
import styles from "../page.module.css";
import "../styles/PersonalInfoComponent.css";
import { Padding } from "@mui/icons-material";

const PersonalInfoComponent = () => {

  const [editableItem, setEditableItem] = useState(null);

  const items = [
    { label: "Username", value: "test" },
    { label: "Email Address", value: "test" },
    { label: "Contact Number", value: "test" },
    { label: "Password", value: "test" },
    { label: "Bio", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer feugiat scelerisque varius morbi enim. Amet facilisis magna etiam tempor. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Ut tellus elementum sagittis vitae et leo duis ut diam. Cursus eget nunc scelerisque viverra. Bibendum arcu vitae elementum curabitur vitae. Fusce ut placerat orci nulla pellentesque dignissim. Id porta nibh venenatis cras sed felis eget. Ullamcorper a lacus vestibulum sed arcu." },
  ];

  const handleEditClick = (index) => {
    setEditableItem(index);
  };

  const handleSaveClick = (index) => {
    // Handle the saving logic here, e.g., update the value in your data
    // For simplicity, let's just cancel editing
    setEditableItem(null);
  };

  return (
    <main className={styles.main}>

      <Container fluid className="mt-3 mb-5 px-5">
        <div className="breadcrumb">
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

          {/* info */}
          <Col lg="10" className="float-left custom" style={{ paddingLeft: '50px' }}>
            {items.map((item, index) => (
              <div key={index}>
                <Row className="d-flex align-items-center mt-lg-0 mt-4">
                  <p>
                    <strong>{item.label}</strong>
                  </p>

                  <div className="d-flex align-items-center ml-auto">
                    {editableItem !== index ? (
                      <Col md={10} xs={9}>
                        <p 
                        className="mr-3"
                        style={{ fontSize: "14px", color: "#505050" }}
                        >{item.value}</p>
                      </Col>
                    ) : (
                      <Col md={10} xs={9}>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => { }}
                          className="w-100"
                        />
                      </Col>
                    )}

                    <Col></Col>

                    <Col className="d-flex align-items-center">
                      {editableItem !== index ? (
                        <Button
                          variant="text"
                          className="ml-auto button"
                          onClick={() => handleEditClick(index)}
                          style={{ marginBottom: '12px' }}
                        >
                          Change
                        </Button>
                      ) : (
                        <Button
                          variant="text"
                          className="ml-auto"
                          onClick={() => handleSaveClick(index)}
                        >
                          Save
                        </Button>
                      )}
                    </Col>
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

export default PersonalInfoComponent;
