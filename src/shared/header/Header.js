import React from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";

import Navigation from "../navigation/Navigation";

const Header = props => {
  return (
    <div className="Header">
      <img src={logo} className="Header-logo" alt="logo" />
      <h4 className="Header-title">Easy Polls</h4>
      <Navigation />
    </div>
  );
};

export default Header;
