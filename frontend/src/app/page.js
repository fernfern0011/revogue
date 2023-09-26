import Image from 'next/image'
import styles from './page.module.css'
import Head from 'next/head'

// Component imports
import LandingComponent from './components/LandingComponent';
import ThriftingComponent from './components/ThriftingComponent';
import ProductsComponent from './components/ProductsComponent';

export default function Home() {
  return (
    <main className={styles.main}>
       <Head>
        <title>My page title</title>
      </Head>
      <LandingComponent />
      <h1 style={{ textAlign: "center" }}>Why thrifting?</h1>
      <ThriftingComponent />
      <ProductsComponent />

    </main>
  )
}
