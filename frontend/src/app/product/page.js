'use client'
import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import ProductUpload from "../components/ProductUpload";

export default function Product() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <ProductUpload />
        </div>
      </main>
    </div>
  );
}