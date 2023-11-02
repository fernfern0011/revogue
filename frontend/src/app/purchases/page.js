'use client';
import React, { useEffect } from 'react';
import styles from '/styles/orders.module.css';
import OrderGridActive from '../components/OrderGridActive.js';
import OrderGridCancelled from '../components/OrderGridCancelled.js';
import OrderGridCompleted from '../components/OrderGridCompleted.js';
import OrderGridProcessing from '../components/OrderGridProcessing.js'

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const handleLoginStatusChange = (status) => {
    setIsLoggedIn(status);
  }

  useEffect(() => {
    // By default, open the first tab
    document.getElementsByClassName(styles.tablinks)[0].click();
  }, []);

  function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    const tablinks = document.getElementsByClassName(styles.tablinks);

    // Hide all tab content
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    // Remove the "active" class from all tab buttons
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove(styles.active);
    }

    // Show the selected tab content and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add(styles.active);
 
  }


  return (
    <main className={styles.main}>
      <div>
            <h1 className={styles.orders}>My Orders</h1>
            <div className={styles.tab}>
            <button className={styles.tablinks} onClick={(evt) => openTab(evt, 'processing')}>
            Processing
            </button>  
            <button className={styles.tablinks} onClick={(evt) => openTab(evt, 'pending')}>
            Pending
            </button>
            <button className={styles.tablinks} onClick={(evt) => openTab(evt, 'cancelled')}>
            Cancelled
            </button>
            <button className={styles.tablinks} onClick={(evt) => openTab(evt, 'completed')}>
            Completed
            </button>
        </div>
        <hr className={styles.horizontalLine}/>

        <div id="processing" className={`${"tabcontent"}`}>
            <OrderGridProcessing />
        </div>

        <div id="pending" className={`${"tabcontent"}`}>
            <OrderGridActive />
        </div>

{/* Cancelled Tab */}
      <div id="cancelled" className={`${"tabcontent"}`}>
        <OrderGridCancelled />
      </div>

{/* Completed Tab */}
      <div id="completed" className={`${"tabcontent"}`}>
        <OrderGridCompleted />
      </div>
      </div>

    </main>

  );
}
