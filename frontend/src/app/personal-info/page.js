"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
// import Button from "@mui/material/Button";
import SidebarComponentPersonalInfo from "../components/SidebarComponentPersonalInfo";
import bcrypt from "bcryptjs";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Button } from "react-bootstrap";

//style imports
import styles from "../page.module.css";
import "../styles/PersonalInfoComponent.css";
import { useSession } from "next-auth/react";

function PersonalInfoPage() {
  // const {data: session} = useSession();
  // let accID;
  // if (session){
  //   accID = session.id;
  //   console.log(accID);
  // }
  // else{
  //   console.log('No session')
  // }

  const [info, setInfo] = useState(null);
  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");

  const accid = 10; //for testing
  useEffect(() => {
    fetch(`https://revogue-backend.vercel.app/api/account?accid=${accid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        setInfo(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditPasswordClick = () => {
    setOriginalPassword(info[0].accpass);
    setNewPassword(info[0].accpass);
    setEditingPassword(true);
  };

  const handleCancelPasswordEdit = () => {
    setEditingPassword(false);
    setNewPassword("");
  };

  const handleSavePasswordClick = () => {
    if (newPassword === originalPassword) {
      setEditingPassword(false);
      return;
    }
    console.log("test client");
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

    fetch(`https://revogue-backend.vercel.app/api/account/update-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accid: accid,
        accpass: originalPassword, // Current password
        newpass: hashedNewPassword, // New password
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to update password");
        }
      })
      .then((data) => {
        console.log("Server Response Data:", data);

        if (data.msg === "Password is updated") {
          alert("Password updated successfully");
          setEditingPassword(false);
          setOriginalPassword(newPassword);
        } else {
          throw new Error("Failed to update password");
        }
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        alert("Failed to update password");
      });
  };

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
            <SidebarComponentPersonalInfo />
          </Col>

          <Col lg="10" className="float-left custom">
            {info ? (
              info.map((data, index) => (
                <div key={data.accid}>
                  <Row className="d-flex align-items-center pb-3">
                    <h4>
                      <strong>Username</strong>
                    </h4>
                    <div className="d-flex align-items-center ml-auto mt-3">
                      <Col>
                        <h5 className="mr-3">
                          <strong>{data.username}</strong>
                        </h5>
                      </Col>
                    </div>
                  </Row>
                  <hr />

                  <Row className="d-flex align-items-center mt-3 pb-3">
                    <h4>
                      <strong>Email</strong>
                    </h4>

                    <div className="d-flex align-items-center ml-auto mt-3">
                      <Col>
                        <h5 className="mr-3">
                          <strong>{data.accemail}</strong>
                        </h5>
                      </Col>
                    </div>
                  </Row>
                  <hr />

                  <Row className="d-flex align-items-center mt-3 pb-3">
                    <h4>
                      <strong>Password</strong>
                    </h4>

                    <div className="d-flex align-items-center ml-auto mt-3">
                      <Col className="d-flex align-items-center">
                        {editingPassword ? (
                          <Form noValidate>
                            <Form.Control
                              type="password"
                              placeholder="Your new password here"
                              required
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </Form>
                        ) : (
                          <h5 className="mr-3">
                            <strong>********</strong>
                          </h5>
                        )}
                      </Col>

                      <Col className="d-flex align-items-center">
                        {editingPassword ? (
                          <div
                          className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              className="btn btn-success text-light"
                              onClick={handleSavePasswordClick}
                              disabled={!newPassword.trim()}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger text-light"
                              onClick={handleCancelPasswordEdit}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-custom text-light"
                            onClick={handleEditPasswordClick}
                          >
                            Change
                          </button>
                        )}
                      </Col>
                    </div>
                  </Row>
                  <hr />
                </div>
              ))
            ) : (
              <p>Loading data...</p>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default PersonalInfoPage;
