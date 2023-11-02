"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Button from "@mui/material/Button";
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
    `https://revogue-backend.vercel.app/api/account?accid=${accid}`,
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
  const [editableItem, setEditableItem] = useState(false); //doesnt give errors
  // const [editableItem, setEditableItem] = useState(false);
  console.log(editableItem);
  const [stateChange, setStateChange] = useState(false);

  // const handleEditClick = (status) => {
  //   console.log("test1");
  //   setEditableItem(true);
  // };
  // const handleSaveClick = (status) => {
  //   console.log("test2");
  //   setEditableItem(false);
  // };

  const handleEditClick = () => {
    alert("change click");
    console.log("test1");
    console.log(index);
    setEditableItem(true);
  };

  const handleSaveClick = () => {
    alert("save click");
    console.log("test2");
    setEditableItem(false);
  };

  useEffect(() => {
    setStateChange(true);
  }, editableItem);

  //load data from backend
  const infoData = await getInfoData();
  const info = infoData.data;

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

                {/* pw */}
                <Row className="d-flex align-items-center mt-3">
                  <form onSubmit={onSubmitPw}>
                    <p>
                      <strong>Password</strong>
                    </p>

                    <div className="d-flex align-items-center ml-auto">
                      <Col>
                        {/* {editableItem === index ? (
                          <input
                            type="password"
                            name="newpass"
                            defaultValue={accountData.accpass}
                          />
                        ) : (
                          <p className="mr-3">********</p>
                        )} */}

                        {/* {editableItem === false ? (
                          <Col>
                            <p className="mr-3">********</p>
                          </Col>
                        ) : (
                          <Col>
                            <input
                              type="password"
                              value={accountData.accpass}
                              onChange={(e) => {}}
                            />
                          </Col>
                        )} */}

                        {editableItem === index ? (
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
                        {/* {editableItem === false ? (
                          <Button
                            variant="outlined"
                            onClick={() => handleEditClick(true)}
                          >
                            Change
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            type="submit"
                            onClick={() => handleSaveClick(false)}
                          >
                            Save
                          </Button>
                        )} */}

                        {stateChange == false ? (
                          <input type="button"
                            // variant="text"
                            className="ml-auto"
                            value="Change"
                            onClick={(e) => {
                              e.preventDefault;

                              handleEditClick();
                            }}
                          />
                          //   Change
                          // </input>
                        ) : (
                          <input type="button"
                            // variant="text"
                            className="ml-auto"
                            value="Save"
                            onClick={(e) => {
                              e.preventDefault
                              handleSaveClick()}}
                          />
                            // Save
                          // </input>
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
