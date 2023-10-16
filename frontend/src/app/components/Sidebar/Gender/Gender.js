import React, { useState } from "react";
import "./Gender.css";

function Gender() {
  const [isDropdownOpen, setDropdownOpen] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCheckboxClick = () => {
    console.log("Clicked");
  };

  return (
    <div>
      <h2 className="sidebar-title" onClick={toggleDropdown}>Gender     
      </h2>

      <div className={`category-dropdown ${isDropdownOpen ? "open" : ""}`}>
        <label className="sidebar-label-container">
          <input type="checkbox" name="gender" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Male
        </label>
        <label className="sidebar-label-container">
          <input type="checkbox" name="gender" onClick={handleCheckboxClick} />
          <span className="checkmark blue-border"></span>Female
        </label>
      </div>
      <hr/>
    </div>
  );
}

export default Gender;
