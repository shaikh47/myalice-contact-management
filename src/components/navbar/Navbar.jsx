import { Menu } from "antd";
import "./navbar.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  return (
    <Menu mode="horizontal" className="menu">
      <div className="navbar-title">Contact Management</div>

      <div className="profile-info">
        {JSON.parse(Cookies.get("contact")).firstName.toUpperCase() +
          " " +
          JSON.parse(Cookies.get("contact")).lastName.toUpperCase()}
        <Link to={`/contact`}>
          <div className="profile-icon">
            {JSON.parse(Cookies.get("contact"))
              .lastName.charAt(0)
              .toUpperCase()}
          </div>
        </Link>
      </div>
    </Menu>
  );
};

export default Navbar;
