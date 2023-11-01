"use client";
import Image from "next/image";
import React, { useState } from "react";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

//style imports
import styles from "../page.module.css";
import "../styles/SidebarComponent.css";

//image imports
import accountPic from "../../../public/images/icon/account.png";

const SidebarComponentAddress = () => {
  return (
    <div className="d-flex" id="wrapper" >
      {/* Sidebar */}
      <div className="border-0 bg-white" id="sidebar-wrapper">
        <div className="list-group list-group-flush bg-white">
          <Nav.Link
            as="a"
            href="personal-info"
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text white-background"
            activeClassName="active" // Apply the 'active' class when the link is active
            style={{ fontSize: "14px" }} // Add this line
          >
            <img
              src="/images/icon/account.png"
              alt=""
              width="20"
              height="20"
              className="imgPad"
            />
            Personal Info
          </Nav.Link>

          <Nav.Link
            as="a"
            href="address"
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text gray-background"
            activeClassName="active"
            style={{ fontSize: "14px" }} // Add this line
          >
            <img
              src="/images/icon/icons8-location-24.png"
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
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text white-background"
            activeClassName="active"
            style={{ fontSize: "14px" }} // Add this line
          >
            <img
              src="images/icon/icons8-wallet-24.png"
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
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text white-background"
            activeClassName="active"
            style={{ fontSize: "14px" }} // Add this line
          >
            <img
              src="/images/icon/icons8-image-24.png"
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

export default SidebarComponentAddress;
