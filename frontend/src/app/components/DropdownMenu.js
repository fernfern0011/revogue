import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DropdownMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown">
      <a
        className="dropdown-toggle d-flex align-items-center hidden-arrow"
        href="#"
        role="button"
        onClick={toggleDropdown}
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-circle ps-2 pe-2"
          height="25"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
        <span className="ps-2 pe-2">Placeholder Name</span>
      </a>
      {isDropdownOpen && (
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="#">
              My profile
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Account Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Wishlist
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              My Listings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              My Purchases
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              My Sales
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              My Blogs
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;

