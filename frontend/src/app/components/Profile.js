'use client';
import React, { useState } from 'react';

// css import
import '../styles/Profile.css';

// material ui imports
import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentRarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const [isCreateItemOverlayOpen, setCreateItemOverlayOpen] = useState(false);

    const openCreateItemOverlay = () => {
        setCreateItemOverlayOpen(true);
    };

    const closeCreateItemOverlay = () => {
        setCreateItemOverlayOpen(false);
    };


  return (
    <div>

      <Button
        className="profile"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
      >
        <img src="../images/Raccoon.jpg" className="profile-image" /> 
        Some Name
        <ExpandMoreIcon />
      </Button>
      
      {/* popup menu */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        anchorOrigin={{
            vertical: 'bottom', // Pop up from the bottom
            horizontal: 'right', // Pop up from the right
        }}
          transformOrigin={{
            vertical: 'top', // Position the menu's top at the anchor's bottom
            horizontal: 'right', // Position the menu's right at the anchor's right
        }}
      >

        {/* popup menu items */}
        <MenuItem onClick={handleClose}>
            <div className="menu-icons1">
                <PermIdentityIcon />
            </div>
            <div className="menu-icons">
                Account Setting
            </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
            <div className="menu-icons1">
                <FavoriteBorderIcon />
            </div>
            <div className="menu-icons">
                Wishlist
            </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
            <div className="menu-icons1">
                <AddCircleOutlineIcon />
            </div>
            <div className="menu-icons">
                Add Item            </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
            <div className="menu-icons1">
                <LocalOfferIcon />
            </div>
            <div className="menu-icons">
                My Listing
            </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
            <div className="menu-icons1">
                <ShoppingBagIcon />
            </div>
            <div className="menu-icons">
                My Orders
            </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
            <div className="menu-icons1">
                <ReceiptLongSharpIcon />
            </div>
            <div className="menu-icons">
                My Blog
            </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
            <div className="menu-icons1" style={{ color: 'red' }}>
                <LogoutSharpIcon />
            </div>
            <div className="menu-icons" style={{ color: 'red' }}>
                Logout
            </div>
        </MenuItem>

      </Menu>
    </div>
  );
}

export default Profile;