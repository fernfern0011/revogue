"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
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
import {useSession} from "next-auth/react";

function AddToCartPage() {
  const {data: session} = useSession();
  let accID;
  if (session){
    accID = session.id;
    console.log(accID);
  }
  else{
    console.log('No session')
  }
  
  const [cartlist, setCart] = useState(null);
  
  // Fetch cart data using promises
  useEffect(() => {
    fetch(
      `https://revogue-backend.vercel.app/api/cart/get-all-cartitems?accid=${accID}`,
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
        setCart(data.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  console.log(cartlist);
  console.log(typeof(cartlist));

  const shippingFee = 0;

  // Calculate the sub total
  const calculateSubTotal = () => {
    if (!cartlist) {
      return 0; 
    }
  
    let totalPrice = 0;
    for (var item of Object.values(cartlist)) {
      totalPrice += parseFloat(item.price);
    }
    return totalPrice.toFixed(2);
  };
  
  // Calculate the grand total
  const calculateGrandTotal = () => {
    let total = parseFloat(calculateSubTotal()) + parseFloat(shippingFee);
    return total.toFixed(2);
  };

  async function deleteCartItem(cartItemId) {
    var accid = 1;
    console.log("test delete");
    console.log(cartItemId);
    try {
      const response = await fetch(
        `https://revogue-backend.vercel.app/api/cart/delete?cartitemid=${cartItemId}&accid=${accid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartitemid: cartItemId, accid: accid }),
        }
      );
  
      if (response.status === 201) {
        alert("Selected item has been deleted");
        setCart((prevCart) =>
          prevCart.filter((item) => item.cartitemid !== cartItemId)
        );
      } else {
        alert("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert(error);
    }
  }

  return (
    <main className={styles.main}>
      <div className="ps-5 mt-3">
        <p>
          Home &nbsp; {">"} &nbsp; <b>Add To Cart</b>
        </p>
      </div>

      <br></br>

      <Container
        fluid
        style={{ backgroundColor: "#F3F3F3", paddingLeft: 0, paddingRight: 0 }}
      >
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
              {cartlist ? (
                cartlist.map((data, index) => (
                  <tr key={data.cartitemid}>
                    <td></td>
                    <td>
                      <Row>
                        <Col xs="auto">
                          <img
                            src={data.images}
                            alt=""
                            width="150"
                            height="150"
                          />
                        </Col>
                        <Col>
                          <p>{data.productname}</p>
                          <p>Size: {data.size}</p>
                        </Col>
                      </Row>
                    </td>
                    <td>${data.price}</td>
                    <td>FREE</td>
                    <td>${data.price}</td>
                    <td>
                      <Button onClick={(e) => deleteCartItem(data.cartitemid)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div className="container d-flex justify-content-center align-items-center">
          <div className="jumbotron text-center" style={{ padding: "20px" }}>
            <Row>
              <Col xs="6">Sub Total</Col>
              <Col xs="6">${calculateSubTotal()}</Col>
            </Row>

            <Row>
              <Col xs="6">Shipping</Col>
              <Col xs="6">${shippingFee}</Col>
            </Row>

            <br></br>

            <Row>
              <Col xs="6">
                <b>Grand Total</b>
              </Col>
              <Col xs="6">
                <b>${calculateGrandTotal()}</b>
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
}

export default AddToCartPage;
