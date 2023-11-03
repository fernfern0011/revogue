"use client"
import { Button } from '@mui/material';
import styles from '../../../../styles/_error.module.css';
import buttons from '../../../../styles/buttons.module.css';
import Link from 'next/link';

export default function NotAuthorized() {
    return (
        <div className={styles.content}>
            <h3>Cart is empty. Login to continue</h3>
            <Link className="nav-link" href={"/login"}>
                <Button className={buttons.btn} variant="contained" color='error'>Login</Button>
            </Link>
        </div>
    );
};