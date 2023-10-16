import React, { useState } from "react";
import "./Price.css";

function Price() {
  const [isDropdownOpen, setDropdownOpen] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCheckboxClick = () => {
    console.log("Clicked");
  };

  return (
    <div>
      <h2 className="sidebar-title" onClick={toggleDropdown}>
        Price 
      </h2>

      <div className={`category-dropdown ${isDropdownOpen ? "open" : ""}`}>
        <label className="sidebar-label-container">
          <input type="checkbox" name="price" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Top
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="price" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Bottom
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="price" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Dress
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="price" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Outerwear
        </label>
      </div>
      <hr/>
    </div>
  );
}

export default Price;
