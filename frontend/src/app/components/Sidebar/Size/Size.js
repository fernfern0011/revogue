"use client";
import React, { useState } from "react";
import "../Category.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Size() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCheckboxClick = () => {
    console.log("Clicked");
  };

  const iconStyle = {
    fontSize: 22, // Adjust the font size as needed
    marginLeft: "149px", // Position the icon 20px to the right
  };

  const h2Style = {
    marginBottom: "-5px", // Remove bottom margin
    marginTop: "-12px",
  };

  return (
    <div className="main">
      <h2 className="sidebar-title" onClick={toggleDropdown} style={h2Style}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          Size
          <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
            <KeyboardArrowDownIcon style={iconStyle} />
          </span>
        </span>
      </h2>

      <div className={`category-dropdown ${isDropdownOpen ? "open" : ""}`}>
        <label className="sidebar-label-container">
          <input type="checkbox" name="size" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Free Size
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="size" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Size S
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="size" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Size M
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="size" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Size L
        </label>
      </div>
      <hr style={{width: "200px"}}/>
    </div>
  );
}

export default Size;
