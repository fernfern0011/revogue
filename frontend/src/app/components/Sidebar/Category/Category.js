import React, { useState } from "react";
import "./Category.css";

function Category() {
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
        Category 
      </h2>

      <div className={`category-dropdown ${isDropdownOpen ? "open" : ""}`}>
        <label className="sidebar-label-container">
          <input type="checkbox" name="category" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>All
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="category" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Top
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="category" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Bottom
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="category" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Dress
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="category" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Outerwear
        </label>
      </div>
      <hr/>
    </div>
  );
}

export default Category;
