'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// material ui imports
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';

// other imports
import '../styles/Navbar.css';
import Profile from './Profile.js';
// import SearchBar from './SearchBar.js';

function Navbar() {
  const [isSearchActive, setSearchActive] = useState(false);

  const toggleSearchBar = () => {
    setSearchActive(!isSearchActive);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          <li className="nav-item">
            <a className="nav-link ReVogue" aria-current="page" href="#">
              ReVogue
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Shop">
              Shop
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Blog
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="contact-us">
              Contact Us
            </a>
          </li>
          
          <div style={{ float: 'right' }}>
            <a className="nav-link" href="addToCart">
              <ShoppingCartOutlinedIcon className="icon cart" />
            </a>
          </div>

          <div style={{ float: 'right' }}>
              <Profile />
            </div>

            {/* profile image */}
            <li className="nav-item">
              {/* insert profile */}
            </li>
            
            {/* cart / search / notification icons */}
            <div style={{ float: 'right' }}>
              {/* <SearchIcon className="icon search" /> */}
              <ShoppingCartOutlinedIcon className="icon cart" />
              <NotificationsNoneSharpIcon className="icon notification" />
            </div>

          </ul>

          {/* <SearchBar /> */}
          <Profile2  />

        </div>
    </nav>
  );
}

export default Navbar;
