import React from 'react';
import styles from '/styles/profile_page.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileListing from "../components/ProfileListing";
import { Suspense } from 'react';
import { getAllProducts } from '../lib/product/data';

async function SearchBarTabs() {

    const productData = await getAllProducts();

    if (productData.length == 0) {
        return (
        <div className='relative flex items-center justify-center'>
            <h1 className='absolute top-[80%] text-2xl text-purple-600'>No products</h1>
        </div>
        )
    }

    return (
        <main className={styles.main}>

            <div className={styles.centeredContent}>
                <div className={styles.profilePic}>
                    <AccountCircleIcon sx={{ fontSize: 120 }}/>
                </div>
                <div className={styles.profile}>
                    <div className={styles.profileInfo}>
                        <p className={styles.name}>Marci Fummons</p>
                        <p className={styles.handle}>@marcifummons</p>
                        <p className={styles.bio}>Insert bio here</p>
                    </div>
                </div>
            </div>

            <hr className={styles.horizontalLine}/>

            <div className='d-flex flex-wrap col-lg-9'>
                <Suspense fallback={<p>Loading products...</p>}>
                    {productData.map((product) => (
                    <ProfileListing key={product.productid} productid={product.productid} productname={product.productname} price={product.price} image={product.images} />
                    ))}
                </Suspense>
            </div>

      </main>
    )
}

export default SearchBarTabs;