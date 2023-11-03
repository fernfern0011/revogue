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
import { useRouter } from "next/navigation";

function AddToCartPage() {
  const [cartlist, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [productData, setProductData] = useState(null);
  const [newsession, setnewSession] = useState(null);

  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/error/403');
    return null;
  }

  let accid = session.id;

  const createCheckoutSession = async () => {
    try {
      const stripes = await stripePromise;
      console.log(stripes);

      if (!stripe) {
        console.error('Stripe is not available.')
        return;
      }

      const response = await fetch(`http://localhost:5000/api/cart/get-all-cartitems?accid=${accid}`);
      if (!response.ok) {
        throw new Error('Error fetching product information');
      }
      const responseData = await response.json();
      const cartItems = responseData.data;
      console.log(cartItems)

      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error('No cart items found.');
      }

      const productData = [];

      for (const cartItem of cartItems) {
        const productName = cartItem.productname;
        const productPrice = parseFloat(cartItem.price);

        const product = await stripe.products.create({
          name: productName,
        });

        const priceInCents = Math.round(productPrice * 100);

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: priceInCents,
          currency: 'sgd',
        });

        productData.push({ product, price });
      }

      const lineItems = productData.map((item) => ({
        price: item.price.id,
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${window.location.origin}/?success=true`,
        cancel_url: `${window.location.origin}/?canceled=true`,
        automatic_tax: { enabled: true },
      });

      setProductData(productData);
      setnewSession(newsession);


      // Redirect to the Stripe Checkout page
      window.location.href = session.url;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  // Fetch cart data using promises
  useEffect(() => {
    if (accid) {
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
          setCart(data.data);
          setIsLoading(false); // Set isLoading to false when data is loaded
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
          setIsLoading(false); // Set isLoading to false on error
        });
    }
  }, [accid]);

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
                    <CartComponent key={index} data={data} />
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
