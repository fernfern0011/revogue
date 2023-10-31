"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Head from "next/head";

//bootstrap import
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Jumbotron from 'react-bootstrap/Jumbotron';

// Component imports
import Navbar from './components/Navbar'
import VerticalCarousel from './components/ItemPage'

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Home Page</title>
      </Head>

      <Navbar />

    </main>
  );
}

