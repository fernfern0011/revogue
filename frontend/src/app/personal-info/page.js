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
import { useSession } from "next-auth/react";

//retrieve data from backend API
// async function getInfoData() {
//   var accid = 1;
//   const getInfoRes = await fetch(
//     `https://revogue-backend.vercel.app/api/account?accid=${accid}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const getInfoStatus = getInfoRes.status;
//   if (getInfoStatus == 200) {
//     return getInfoRes.json();
//   }
// }

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

  useEffect(() => {
    const accid = 1; //for testing
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
  // console.log(info);

  const handleEditPasswordClick = () => {
    setOriginalPassword(info[0].accpass);
    setNewPassword(info[0].accpass);
    setEditingPassword(true);
  };

  const handleSavePasswordClick = () => {
    // Here, you can send the new password to your server for validation and update.
    // Add API call to update the password and handle success or error.
    // After successful password change:
    setEditingPassword(false);
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
            <SidebarComponent />
          </Col>

          <Col lg="10" className="float-left custom">
            {info ? (
              info.map((data, index) => (
                <div key={data.accid}>
                  <Row className="d-flex align-items-center">
                    <p>
                      <strong>Username</strong>
                    </p>
                    <div className="d-flex align-items-center ml-auto">
                      <Col>
                        <p className="mr-3">{data.username}</p>
                      </Col>

                      <Col></Col>
                      <Col className="d-flex align-items-center"></Col>
                    </div>
                  </Row>
                  <hr />

                  <Row className="d-flex align-items-center mt-3">
                    <p>
                      <strong>Email</strong>
                    </p>

                    <div className="d-flex align-items-center ml-auto">
                      <Col>
                        <p className="mr-3">{data.accemail}</p>
                      </Col>

                      <Col></Col>
                      <Col className="d-flex align-items-center"></Col>
                    </div>
                  </Row>
                  <hr />

                  <Row className="d-flex align-items-center mt-3">
                    <p>
                      <strong>Password</strong>
                    </p>

                    <div className="d-flex align-items-center ml-auto">
                      <Col>
                        {/* <p className="mr-3">{data.accpass}</p> */}
                        {editingPassword ? (
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        ) : (
                          <p className="mr-3">********</p>
                        )}
                      </Col>

                      <Col></Col>

                      <Col>
                        {/* <Button >Change</Button> */}
                        {editingPassword ? (
                          <Button onClick={handleSavePasswordClick}>
                            Save
                          </Button>
                        ) : (
                          <Button onClick={handleEditPasswordClick}>
                            Change
                          </Button>
                        )}
                      </Col>

                      <Col className="d-flex align-items-center"></Col>
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
