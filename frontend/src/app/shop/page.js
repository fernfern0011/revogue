import React from 'react';
// import Sidebar from "../components/Sidebar/Sidebar";
import './page.css'
import ProductListing from '../components/ProductListing';
import { Suspense } from 'react';
import { getAllProducts } from '../lib/product/data';

// sidebar
import Gender from "../components/Sidebar/Gender/Gender";
import Size from "../components/Sidebar/Size/Size";
import Category from "../components/Sidebar/Category/Category";
import Price from "../components/Sidebar/Price/Price";
// import "../components/Sidebar/Sidebar.css";

async function ShopPage() {
  const productData = await getAllProducts();

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

      <div className="d-flex col-lg-12 mt-4 py-3 bg-secondary">
        <p>filter</p>
      </div>

      <div className='d-flex mx-auto py-3 bg-secondary'>
        
        <div className="vertical-stack">
          <Gender />
          <Size />
          <Category />
          <Price />
        </div>

        <div className='d-flex flex-wrap col-lg-9'>
          <Suspense fallback={<p>Loading products...</p>}>
            {productData.map((product) => (
              <ProductListing key={product.productid} productid={product.productid} productname={product.productname} price={product.price} image={product.images} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
