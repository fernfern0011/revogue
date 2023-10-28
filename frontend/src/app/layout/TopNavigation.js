"use client"
import Link from "next/link";
import React from "react";
import Image from 'next/image'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const TopNavigation = () => {
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

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
                        <li className="nav-item pe-3 ps-3">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item pe-3 ps-3">
                            <Link className="nav-link" href="/shop">Shop</Link>
                        </li>
                        <li className="nav-item pe-3 ps-3">
                            <Link className="nav-link" href="#">Blog</Link>
                        </li>
                        <li className="nav-item pe-3 ps-3">
                            <Link className="nav-link" href="/contact-us">Contact Us</Link>
                        </li>
                    </ul>


                    <div className="d-flex align-items-center justify-content-end">
                        {/* Shopping Cart */}
                        <Link className="text-reset me-3" href="#">
                            <ShoppingCartOutlinedIcon fontSize="medium" />
                        </Link>

                        {/* Notification */}
                        <div className="dropdown">
                            <Link
                                //  dropdown-toggle
                                className="text-reset me-3 hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                // data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <NotificationsOutlinedIcon fontSize="medium" />
                                {/* <span className="badge rounded-pill badge-notification bg-danger">1</span> */}
                            </Link>
                        </div>

                        {/* Profile */}
                        <div className="dropdown profile">
                            <Link
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle ps-2 pe-2"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                                <span className="ps-2 pe-2">Placeholder Name</span>
                            </Link>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <Link className="dropdown-item" href="#">My profile</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="#">Account Settings</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="#">Wishlist</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="#">My Listings</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="#">My Purchases</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="#">My Sales</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="#">My Blogs</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="#">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <button
                    className="navbar-toggler ms-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <MenuOutlinedIcon fontSize="medium" />
                </button>
            </div>
        </nav >
    )
}

export default TopNavigation;