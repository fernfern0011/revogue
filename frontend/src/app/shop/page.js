import React from "react";
// import Sidebar from "../components/Sidebar/Sidebar";
import './page.css'
import ShopListing from '../components/ShopListing';
import { Suspense } from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import SelectSmall from '../components/SelectSmall';

async function getAllProducts() {

  // get product list
  const getProductRes = await fetch(`${process.env.backendUrl}/api/product/get-all-products`, {
    headers: { "Content-Type": "application/json" }
  })

  const getProductStatus = getProductRes.status;

  if (getProductStatus == 200) {
    return getProductRes.json();
  }
}

// sidebar
import Gender from "../components/Sidebar/Gender/Gender";
import Size from "../components/Sidebar/Size/Size";
import Category from "../components/Sidebar/Category/Category";
import Price from "../components/Sidebar/Price/Price";
// import "../components/Sidebar/Sidebar.css";

async function ShopPage() {
  const productData = await getAllProducts();
  const productList = productData.data;

  if (productData.length == 0) {
    return (
      <div className='relative flex items-center justify-center'>
        <h1 className='absolute top-[80%] text-2xl text-purple-600'>No products</h1>
      </div>
    )
  }

  return (
    <div>

      <div className="d-flex col-lg-12 mt-2 mb-1 select">
        <SelectSmall/>
      </div>

      <div className='d-flex mx-auto py-3 flex-column flex-sm-row'>
        
        <div className="vertical-stack col-xs-2">
          <Gender />
          <Size />
          <Category />
          <Price />
        </div>

        <Col lg="10" className="float-left">
        <Container fluid>
          <div className='d-flex flex-wrap col-xs-10 col-lg-10 mt-sm-0 mt-4'>
            <Suspense fallback={<p>Loading products...</p>}>
              {productList.map((product) => (
                <ShopListing key={product.productid} productid={product.productid} productname={product.productname} price={product.price} image={product.images} />
              ))}
            </Suspense>
          </div>
        </Container>
        </Col>
      </div>
    </div>
  );
}

export default ShopPage;
