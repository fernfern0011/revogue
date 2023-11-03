"use client";
// import Image from "next/image";
// import styles from "./page.module.css";
// import Head from "next/head";

//bootstrap import
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Jumbotron from 'react-bootstrap/Jumbotron';

// Component imports
import LandingComponent from "./components/LandingComponent";
import ThriftingComponent from "./components/ThriftingComponent";
import ProductsComponent from "./components/ProductsComponent";
import ContactUsPage from "./contact-us/page";

// import Sidebar from './components/Sidebar/Sidebar'

export default function Home() {
  return (
    <Container fluid>
      <Row className="mb-4 mx-2">
        {/* LandingComponent */}
        <LandingComponent />
      </Row>

      { /* ThriftingComponent */}
      <Row className="mb-4 mx-2 justify-content-center">
        <ThriftingComponent text="Why Thrifting?" />
      </Row>

      {/* ProductsComponent */}
      <Row className="mb-4 mx-2 justify-content-center">
        <ProductsComponent />
      </Row>

      {/* ContactUsComponent */}
      <Row className="mb-4 mx-2 justify-content-center">
        <ContactUsPage />
      </Row>
    </Container>
  )
};
