import React from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import './page.css'
import ProductListing from '../components/ProductListing';
import { Suspense } from 'react';

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
      <div className="d-flex col-lg-12 mt-4 py-3 bg-primary">
        sort
      </div>

      <div className='d-flex mx-auto py-3 bg-secondary'>
        <div className="col-lg-3">
          <p>filter</p>
        </div>

        <div className='d-flex flex-wrap col-lg-9'>
          <Suspense fallback={<p>Loading products...</p>}>
            {productList.map((product) => (
              <ProductListing key={product.productid} productid={product.productid} productname={product.productname} price={product.price} image={product.images} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
