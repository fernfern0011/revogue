"use client"
import Gender from "./Gender/Gender";
import Size from "./Size/Size";
import Category from "./Category/Category";
import Price from "./Price/Price";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <section className="sidebar">
        <Gender />
        <Size />
        <Category />  
        <Price />
      </section>
    </>
  );
};

export default Sidebar;
