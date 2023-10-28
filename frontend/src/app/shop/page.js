"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import './page.css'
import ProductListing from '../components/ProductListing';
import { Suspense } from 'react';
import getAllProducts from '../../../lib/getAllProducts';

async function ShopPage() {
  const productData = await getAllProducts();
  const productList = await productData.data;

  return (
    <div>
      <div className="d-flex col-lg-12 mt-4 py-3 bg-primary">
        sort
      </div>

      <div className='d-flex mx-auto py-3 bg-secondary'>
        <div className="col-lg-3">
          <p>filter</p>
        </div>

        <div className='d-flex flex-wrap col-lg-9'>
          <Suspense fallback={<p>Loading...</p>}>
            {productList.map((product) => (
              <ProductListing productid={product.productid} productname={product.productname} price={product.price} image={product.images} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
