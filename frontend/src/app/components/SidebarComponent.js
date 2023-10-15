"use client";
import Image from "next/image";
import React, { useState } from "react";
// import Button from "@mui/material/Button";
import { BrowserRouter as Router } from "react-router";
import { NavLink } from "react-router-dom";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

//style imports
import styles from "../page.module.css";
import "../styles/SidebarComponent.css";

//image imports
import accountPic from "../../../public/images/icon/account.png";

const SidebarComponent = () => {
  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="border-0 bg-white" id="sidebar-wrapper">
        <div className="list-group list-group-flush">
          <Nav.Link
            to="/PersonalInfoComponent"
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text"
            activeClassName="active" // Apply the 'active' class when the link is active
          >
            <img
              src={accountPic}
              alt=""
              width="20"
              height="20"
              className="imgPad"
            />
            Personal Info
          </Nav.Link>

          <Nav.Link
            // as="a"
            to="./PersonalInfoComponent"
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text"
            activeClassName="active"
          >
            <img
              src="/path/to/personal-info-logo.png"
              alt=""
              width="20"
              height="20"
              className="imgPad"
            />
            Address
          </Nav.Link>

          <Nav.Link
            // as="a"
            to="./PersonalInfoComponent"
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text"
            activeClassName="active"
          >
            <img
              src={accountPic}
              alt=""
              width="20"
              height="20"
              className="imgPad"
            />
            Wallet
          </Nav.Link>

          <Nav.Link
            // as="a"
            to="./PersonalInfoComponent"
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text"
            activeClassName="active"
          >
            <img
              src="/path/to/personal-info-logo.png"
              alt=""
              width="20"
              height="20"
              className="imgPad"
            />
            Change Profile
          </Nav.Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
