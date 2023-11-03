"use client"
import * as React from "react";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";

//style imports
import "../styles/ProductsComponent.css";
import styles from "../page.module.css";
import RecentProduct from "./RecentProduct";
import { useEffect, useState } from "react";

function ProductsComponent() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/product/recent-products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching product information');
        }
        return response.json();
      })
      .then((responseData) => {
        const productList = responseData.data;
        if (!Array.isArray(productList) || productList.length === 0) {
          throw new Error('Fail to get recent products');
        }
        setProductList(productList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(productList);

  return (
    <main className={styles.main}>
      <Row className="mb-4 mx-2">
        <h1 style={{ textAlign: "center" }}>Products</h1>
      </Row>
      <Container fluid>
        <Row className="mb-4 mx-2 justify-content-center">
          {productList.map((product) => (
            <RecentProduct key={product.productid} productList={product} />
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ProductsComponent;
