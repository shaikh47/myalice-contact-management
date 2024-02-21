import { Menu } from "antd";
import "./navbar.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  console.log("JWT: ", JSON.parse(Cookies.get("contact")));
  return (
    <Menu mode="horizontal" className="menu">
      <Menu.Item key="home">
        <div className="profile-info">
          <Link to={`/contact`}>
            <div className="profile-icon">
              {JSON.parse(Cookies.get("contact"))
                .firstName.charAt(0)
                .toUpperCase()}
            </div>
          </Link>
          {JSON.parse(Cookies.get("contact")).firstName.toUpperCase() +
            " " +
            JSON.parse(Cookies.get("contact")).lastName.toUpperCase()}
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
