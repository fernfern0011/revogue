'use client';
import React, { useState } from 'react';

// material ui imports
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import SearchIcon from '@mui/icons-material/Search';

// other imports
import '../styles/Navbar.css';
import Profile from './Profile.js';
import SearchBar from './SearchBar.js';


function Navbar() {

  const [isSearchActive, setSearchActive] = useState(false);

  const toggleSearchBar = () => {
    setSearchActive(!isSearchActive);
  };

  return (
    
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
            <li className="nav-item">
              <a className="nav-link active ReVogue" aria-current="page" href="#">
                ReVogue
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Shop</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Blog</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Contact Us</a>
            </li>

            {/* Login button */}
            <li className="nav-item" style={{ float: 'right' }}>
              <a className="nav-link active" aria-current="page" href="#">
                <Button className="button">Login</Button>
              </a>
            </li>
            
            <div style={{ float: 'right' }}>
              <Profile />
            </div>

            {/* profile image */}
            <li className="nav-item">
              {/* insert profile */}
            </li>
            
            {/* cart / search / notification icons */}
            <div style={{ float: 'right' }}>
              <SearchIcon className="icon search" />
              <ShoppingCartOutlinedIcon className="icon cart" />
              <NotificationsNoneSharpIcon className="icon notification" />
            </div>

          </ul>

          <SearchBar />

        </div>
    </nav>
  );
}

export default Navbar;
