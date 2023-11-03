"use client";
import React from "react";
//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";

//style imports
import "../styles/SidebarComponent.css";
import Link from "next/link";

const SidebarComponent = () => {
  return (
    <div className="d-flex" id="wrapper" >
      {/* Sidebar */}
      <div className="border-0 bg-white" id="sidebar-wrapper">
        <div className="list-group list-group-flush bg-white">
          <Link href="/personal-info"
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text"
            active
          >
            <img
              src="/images/icon/account.png"
              alt=""
              width="20"
              height="20"
              className="imgPad"
            />
            Personal Info
          </Link>

          <Link
            href="/address"
            className="list-group-item list-group-item-action list-group-item-light py-3 border-0 bold-text"
          >
            <img
              src="/images/icon/icons8-location-24.png"
              alt=""
              width="20"
              height="20"
              className="imgPad"
            />
            Address
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
