'use client'
import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import ProductUpload from "../components/ProductUpload";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ReVogue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <ProductUpload />
        </div>
      </main>
    </div>
  );
}