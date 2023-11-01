"use client";
import React, { useState } from "react";
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
  const [editableItem1, setEditableItem1] = useState(false);
  const [editableItem2, setEditableItem2] = useState(false);

  //for email button
  const handleEditClick1 = () => {
    console.log("test");
    setEditableItem1(true);
  };
  const handleSaveClick1 = () => {
    setEditableItem1(false);
  };

  //for pw button
  const handleEditClick2 = () => {
    console.log("test2");
    setEditableItem2(true);
  };
  const handleSaveClick2 = () => {
    setEditableItem2(false);
  };

  //load data from backend
  const infoData = await getInfoData();
  const info = infoData.data;

  //email form (this is incomplete but does not give error, keep it first for reference)
  async function onSubmitEmail(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch(
      `https://revogue-backend.vercel.app/api/account/update-email/`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
  }

  //password form (this is incomplete but does not give error, keep it first for reference)
  async function onSubmitPw(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch(
      `https://revogue-backend.vercel.app/api/account/update-password/`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
  }

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
            {info.map((accountData, index) => (
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

                {/* email */}
                <Row className="d-flex align-items-center mt-3">
                  <form onSubmit={onSubmitEmail}>
                    <p>
                      <strong>Email</strong>
                    </p>

                    <div className="d-flex align-items-center ml-auto">
                      <Col>
                        {editableItem1 === true ? (
                          <input
                            type="text"
                            name="newemail"
                            defaultValue={accountData.accemail}
                          />
                        ) : (
                          <p className="mr-3">{accountData.accemail}</p>
                        )}
                      </Col>

                      <Col></Col>

                      <Col>
                        {editableItem1 === true ? (
                          <Button
                            variant="outlined"
                            type="submit"
                            onClick={() => handleSaveClick1()}
                          >
                            Save
                          </Button>
                        ) : (
                          ""
                        )}

                        {editableItem1 === false ? (
                          <Button
                            variant="outlined"
                            onClick={() => handleEditClick1()}
                          >
                            Change
                          </Button>
                        ) : (
                          ""
                        )}
                      </Col>

                      <Col className="d-flex align-items-center"></Col>
                    </div>
                  </form>
                </Row>
                <hr />

                {/* pw */}
                <Row className="d-flex align-items-center mt-3">
                  <form onSubmit={onSubmitPw}>
                    <p>
                      <strong>Password</strong>
                    </p>

                    <div className="d-flex align-items-center ml-auto">
                      <Col>
                        {editableItem2 === index ? (
                          <input
                            type="password"
                            name="newpass"
                            defaultValue={accountData.accpass}
                          />
                        ) : (
                          <p className="mr-3">********</p>
                        )}
                      </Col>

                      <Col></Col>

                      <Col>
                        {editableItem2 === index ? (
                          <Button
                            variant="outlined"
                            type="submit"
                            onClick={() => handleSaveClick2(index)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={() => handleEditClick2(index)}
                          >
                            Change
                          </Button>
                        )}
                      </Col>

                      <Col className="d-flex align-items-center"></Col>
                    </div>
                  </form>
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
