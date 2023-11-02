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
import DeleteIcon from '@mui/icons-material/Delete';

//style imports
import styles from "../page.module.css";
import "../styles/AddToCart.css";
import { Padding } from "@mui/icons-material";

const AddToCartComponent = () => {
  return (
    <main className="main">
      <div className="breadcrumb">
        <p>Home &nbsp; {">"} &nbsp; <b>Add To Cart</b></p>
      </div>

      <br></br>

      <Container fluid style={{ backgroundColor: "#F3F3F3", paddingLeft: 0, paddingRight: 0 }}>
        <div className="table-responsive">
          <Table className="custom-table">
            <thead>
              <tr>
                <th></th>
                <th className="product-column">PRODUCT DETAILS</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
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
                        src="/images/image7.png"
                        alt=""
                        height="110px"
                        className="image"
                      />
                    </Col>
                    <Col>
                      <p>Blue Flower Print Crop Top</p>
                      <p className="small">Size: M</p>
                    </Col>
                  </Row>
                </td>

                {/* price */}
                <td className="custom-td">$52.00</td>

                {/* quantity */}
                <td className="custom-td">1</td>

                {/* shipping */}
                {/* <td className="custom-td free">FREE</td> */}

                {/* subtotoal */}
                <td className="custom-td">$33.00</td>

                {/* action */}
                <td className="custom-td"><DeleteIcon style={{ color: '#18b5b5' }} /></td>
              </tr>
              
            </tbody>
          </Table>
        </div>

        {/* not able to use react bootstrap jumbotron, import module error */}
        <div className="container d-flex justify-content-center align-items-center">
          <div className="jumbotron" style={{ padding: "20px" }}>
            <Row>
              <Col xs="8">Sub Total</Col>
              <Col xs="4">$40.00</Col>
            </Row>

            <Row>
              <Col xs="8">Shipping</Col>
              <Col xs="4">$4.00</Col>
            </Row>

            <br></br>

            <Row>
              <Col xs="8">
                <b>Grand Total</b>
              </Col>
              <Col xs="4">
                <b>$44.00</b>
              </Col>
            </Row>

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