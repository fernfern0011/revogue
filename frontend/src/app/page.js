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
// import ProductsComponent from "./components/ProductsComponent";
// import Sidebar from './components/Sidebar/Sidebar'

export default function Home() {
  return (
    <div>
      <Container fluid>
        <Row className="mb-4 mx-2">
          {/* LandingComponent */}
          <LandingComponent />
        </Row>

        {/* Why Thrifting Title */}
        <Row className="mb-4 mx-2">
          <h1 style={{ textAlign: "center" }}>Why Thrifting?</h1>
        </Row>

        { /* ThriftingComponent */}
        <Row className="mb-4 mx-2 justify-content-center">
          <ThriftingComponent />
        </Row>

      </Container>
    </div>
  )
};

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <Head>
//         <title>Home Page</title>
//       </Head>

{/* <Container fluid>
  {/* LandingComponent */}
// <Row className="mb-4 mx-2">
//   <LandingComponent />
// </Row> */}

{/* Why Thrifting Title */ }
{/* //         <Row className="mb-4 mx-2">
//           <h1 style={{ textAlign: "center" }}>Why Thrifting?</h1>
//         </Row> */}

{/* ThriftingComponent */ }
{/* //         <Row className="mb-4 mx-2 justify-content-center">
//           <ThriftingComponent />
//         </Row> */}

{/* ProductsComponent */ }
{/* //         <Row className="mb-4 mx-2 justify-content-center">
//           <ProductsComponent />
//         </Row> */}
{/* </Container> */ }
{/* //       <Sidebar />
//     </main> */}
{/* //   );
// } */}
