import React, { useState } from "react";
import "./Size.css";

function Size() {
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
        Size 
      </h2>

      <div className={`category-dropdown ${isDropdownOpen ? "open" : ""}`}>
        <label className="sidebar-label-container">
          <input type="checkbox" name="size" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Free Size
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="size" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Size XXS
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="size" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Size XS
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
        <label className="sidebar-label-container">
          <input type="checkbox" name="size" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Size XL
        </label>
      </div>
      <hr/>
    </div>
  );
}

export default Size;
