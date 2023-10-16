"use client"
import Sidebar from "../components/Sidebar/Sidebar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import './page.css'

function ProductListingPage() {
  return (
    <div>
      <div className="app">
        <div className="side">
        <Sidebar />
        </div>
        <div className="content">
          <ProductGrid />
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default ProductListingPage;
