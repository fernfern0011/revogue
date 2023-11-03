"use client"
import Link from "next/link";
import React from "react";
import Image from 'next/image'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Button } from "react-bootstrap";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import "./TopNavigation.css";

const TopNavigation = () => {
    const { data: session, status } = useSession();
    let accName;

    if (session) {
        accName = session.user.name;
    }

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">

                <Link className="navbar-brand mt-2 mt-lg-0" href="/">
                    <Image
                        src="/images/revogue-logo.png"
                        width={150}
                        height={50}
                        alt="Revogue Logo"
                        loading="lazy"
                    />
                </Link>

                <button
                    className="navbar-toggler ms-3"
                    type="button"
                    onClick={toggleNavbar} // Toggle the navigation bar
                >
                    <MenuOutlinedIcon fontSize="medium" />
                </button>

                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
                        <li className="nav-item pe-3 ps-3">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item pe-3 ps-3">
                            <Link className="nav-link" href="/shop">Shop</Link>
                        </li>
                        <li className="nav-item pe-3 ps-3">
                            <Link className="nav-link" href="/tweet">Tweet</Link>
                        </li>
                        <li className="nav-item pe-3 ps-3">
                            <Link className="nav-link" href="/contact-us">Contact Us</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center justify-content-start ms-3 justify-content-lg-end">
                        {/* Shopping Cart */}
                        <Link className="text-reset me-3" href="/add-to-cart">
                            <ShoppingCartOutlinedIcon fontSize="medium" />
                        </Link>

                        {/* Profile */}
                        {status === 'authenticated' ?
                            <div className="dropdown profile">
                                <Link
                                    className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                    href="#"
                                    onClick={toggleDropdown}
                                    role="button"
                                >
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                        className="rounded-circle ps-2 pe-2"
                                        height="25"
                                        alt="Black and White Portrait of a Man"
                                        loading="lazy"
                                    />
                                    <span className="ps-2 pe-2" style={{ marginLeft: '-5px', marginRight: '30px' }}>{accName}</span>
                                </Link>

                                <ul style={{ marginTop: '10px' }}
                                    className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}
                                >
                                    <li>
                                        <Link className="dropdown-item" href="/personal-info" style={{ margin: '10px 0', fontSize: "15px" }}>Account Settings</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/wishlist" style={{ margin: '-10px 0', fontSize: "15px" }}>Wishlist</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/purchases" style={{ margin: '-10px 0', fontSize: "15px" }}>My Purchases</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/sales" style={{ margin: '-10px 0', fontSize: "15px" }}>My Sales</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/create-tweet" style={{ margin: '-10px 0', fontSize: "15px" }}>Write a tweet</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/maps" style={{ margin: '-10px 0', fontSize: "15px" }}>Maps</Link>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" style={{ margin: '-10px 0 -10px 0', fontSize: "15px" }}
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                signOut({ redirect: true, callbackUrl: "/" })
                                            }}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                            :
                            <div>
                                <Link className="nav-link" href="/login">
                                    <Button className="button"
                                        style={{ backgroundColor: "#18b5b5" }}>Login</Button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default TopNavigation;