"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { loadStripe } from '@stripe/stripe-js';
import { Suspense } from "react";


const stripe = require('stripe')('sk_test_51O2p9QFD3c4VDISeYPMwEIN9FUSwgdfeqZpcGhhQ6l7af7xrQAXIJ6mb3bbcRNfJFA2zuOojGGtLukbwuEdmgyqt00MRd5fHHK');
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

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
import { useSession } from 'next-auth/react';
import CartComponent from "../components/CartComponent";


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
    const accid = 1;
    fetch(
      `https://revogue-backend.vercel.app/api/cart/get-all-cartitems?accid=${accid}`,
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
    <main className="main">
      <div className="breadcrumb">
        <p>Home &nbsp; {">"} &nbsp; <b>Add To Cart</b></p>
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
                <th className="product-column">PRODUCT DETAILS</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {/* Use Suspense to wait for session and isLoading */}
              <Suspense fallback={<tr><td colSpan="6">Loading...</td></tr>}>
                {session && !isLoading ? (
                  cartlist.map((data, index) => (

                    <CartComponent data={data} />
                    // <tr key={data.cartitemid}>
                    //   <td></td>
                    //   <td>
                    //     <Row>
                    //       <Col xs="auto">
                    //         <img
                    //           src={thumbnail}
                    //           alt=""
                    //           width="150"
                    //           height="150"
                    //           className="image"
                    //         />
                    //       </Col>
                    //       <Col>
                    //         <p>{data.productname}</p>
                    //         <p className="small">Size: {data.size}</p>
                    //       </Col>
                    //     </Row>
                    //   </td>
                    //   <td className="custom-td">${data.price}</td>
                    //   <td className="custom-td">1</td>
                    //   <td className="custom-td">${data.price}</td>
                    //   <td>
                    //     <Button onClick={(e) => deleteCartItem(data.cartitemid)}>
                    //       Delete
                    //     </Button>
                    //   </td>
                    // </tr>
                  ))
                ) : (
                  <tr><td colSpan="6">Loading...</td></tr>
                )}
              </Suspense>
            </tbody>
          </Table>
        </div>

        <div className="container d-flex justify-content-center align-items-center">
          <div className="jumbotron" style={{ padding: "20px" }}>
            <br></br>

            <Row>
              <Col xs="8">
                <b>Total</b>
              </Col>
              <Col xs="4">
                <b>${calculateGrandTotal()}</b>
              </Col>
            </Row>

            <Button variant="contained" className="custom-button" onClick={createCheckoutSession}>
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default AddToCartPage;
