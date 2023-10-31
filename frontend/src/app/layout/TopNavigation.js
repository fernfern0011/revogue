import Link from "next/link";
import React from "react";

const TopNavigation = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">ReVogue</Link></li>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/product-listing">Shop</Link></li>
                <li><Link href="/">Blog</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
            </ul>
        </nav>
    )
}

export default TopNavigation;