import React from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import './page.css'
import { backendUrl } from '../../../config';
import ProductListing from '../components/ProductListing';
import { Suspense } from 'react';
// import { getAllProducts } from '../lib/product/data';

async function getProductData() {
  // get product list
  const getProductRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all-products`, {
    headers: { "Content-Type": "application/json" }
  })

  console.log(getProductRes.status);
  if (!getProductRes.status == 200) {
    throw new Error('Failed to fetch products')
  }

  return await getProductRes.json()
}

async function ShopPage() {
  // const productData = await getAllProducts();
  // console.log(productData);

  const productData = await getProductData();
  const productList = await productData.data;

  if (productList.length == 0) {
    return (
      <div className='relative flex items-center justify-center'>
        <img src="empty.png" alt="" />
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
