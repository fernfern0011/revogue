"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Navbar from "../components/Navbar";

//style imports
import styles from "../page.module.css";
import "../styles/AddToCart.css";
import { Padding } from "@mui/icons-material";

const AddToCartComponent = () => {
  return (
    <main className={styles.main}>
      <div className="ps-5 mt-3">
        <p>Home &nbsp; {">"} &nbsp; <b>Add To Cart</b></p>
      </div>

      <br></br>

      <Container fluid style={{ backgroundColor: "#F3F3F3", paddingLeft: 0, paddingRight: 0 }}>
        <div className="table-responsive">
          <Table className="custom-table">
            <thead>
              <tr>
                <th></th>
                <th>PRODUCT DETAILS</th>
                <th>PRICE</th>
                <th>SHIPPING</th>
                <th>SUBTOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                {/* filler */}
                <td></td>

                {/* product detail */}
                <td>
                  <Row>
                    <Col xs="auto">
                      <img
                        // src=".jpg"
                        alt=""
                        width="50"
                        height="50"
                      />
                    </Col>
                    <Col>
                      <p>Product Name</p>
                      <p>Size:</p>
                    </Col>
                  </Row>
                </td>

                {/* price */}
                <td>$52</td>

                {/* shipping */}
                <td>FREE</td>

                {/* subtotoal */}
                <td>$33</td>

                {/* action */}
                <td>image bin</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* not able to use react bootstrap jumbotron, import module error */}
        <div className="container d-flex justify-content-center align-items-center">
          <div className="jumbotron text-center" style={{ padding: "20px" }}>
            <Row>
              <Col xs="6">Sub Total</Col>
              <Col xs="6">$4</Col>
            </Row>

            <Row>
              <Col xs="6">Shipping</Col>
              <Col xs="6">$4</Col>
            </Row>

            <br></br>

            <Row>
              <Col xs="6">
                <b>Grand Total</b>
              </Col>
              <Col xs="6">
                <b>$100</b>
              </Col>
            </Row>

            <hr></hr>

            <Button variant="contained" className="custom-button">
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default AddToCartComponent;
