import React from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import './page.css'
import ProductListing from '../components/ProductListing';
import { Suspense } from 'react';
import { getAllProducts } from '../lib/product/data';

async function ShopPage() {
  const productData = await getAllProducts();
  console.log(productData);

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
