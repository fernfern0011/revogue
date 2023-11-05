"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "../page.module.css";
import "../styles/AddressComponent.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SidebarComponent from "../components/SidebarComponent";

function AddressPage() {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  let accID;

  useEffect(() => {
    if (session) {
      accID = session.id;
    } else {
      router.push('/error/403');
      return null;
    }
  }, [])

  //default address
  const [defaultAddress, setDefaultAddress] = useState([]);
  useEffect(() => {
    fetch(`https://revogue-backend.vercel.app/api/address/get-default-address?accid=${accID}`, {
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Failed to fetch data");
      }
    }).then((data) => {
      setDefaultAddress(data.data);
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //additional address
  const [additional, setAdditional] = useState('');
  useEffect(() => {
    fetch(
      `https://revogue-backend.vercel.app/api/address/get-all-addresses?accid=${accID}`,
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
        const nonDefaultAddresses = data.data.filter((data) => !data.isdefault);
        setAdditional(nonDefaultAddresses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //delete address
  async function deleteAddress(addressId) {
    // var accid = 1; // for testing
    try {
      const response = await fetch(
        `https://revogue-backend.vercel.app/api/address/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ addressid: addressId, accid: accID }),
        }
      );

      if (response.status === 201) {
        alert("Selected address has been deleted");
        setAdditional((prevCart) =>
          prevCart.filter((item) => item.addressid !== addressId)
        );
      } else {
        alert("Failed to delete the selected address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert(error);
    }
  }

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
              <Col className="col-2"></Col>
              <Col className="col-4">
                <Button variant="text" className="addBtn" onClick={() => router.push('/add-address')}>
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
                      <br />
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
                    <Button variant="text" onClick={(e) => deleteAddress(data.addressid)}>Remove</Button>&nbsp;|&nbsp;
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
