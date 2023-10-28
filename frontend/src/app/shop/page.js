"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import { backendUrl } from '../../../config';
import './page.css'
import ProductListing from '../components/ProductListing';
// import { Suspense } from 'react';

// async function getProductData() {

//   // get product list
//   const getProductRes = await fetch(`${backendUrl}/api/product/get-all-products`, {
//     headers: { "Content-Type": "application/json" },
//     cache: 'no-cache'
//   })

//   if (!getProductRes.status == 200) {
//     throw new Error('failed to fetch data')
//   }

//   return await getProductRes.json()
// }

async function ShopPage() {
  // const productData = await getProductData();
  // const productList = await productData.data;

  // if (productList.length == 0) {
  //   return (
  //     <div className='relative flex items-center justify-center'>
  //       <img src="empty.png" alt="" />
  //       <h1 className='absolute top-[80%] text-2xl text-purple-600'>No products</h1>
  //     </div>
  //   )
  // }

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
          {/* <Suspense fallback={<p>Loading...</p>}>
            {productList.map((product) => (
              <ProductListing productid={product.productid} productname={product.productname} price={product.price} image={product.images} />
            ))}
          </Suspense> */}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
