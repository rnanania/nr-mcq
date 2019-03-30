import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = props => {
  return (
    <div className="Navigation">
      <ul className="Navigation-items">
        <li className="Navigation-item">
          <NavLink to="/admin" activeClassName="active">
            Admin
          </NavLink>
        </li>
        <li className="Navigation-item">
          <NavLink to="/poll" activeClassName="active">
            Poll
          </NavLink>
        </li>
        <li className="Navigation-item">
          <NavLink to="/results" activeClassName="active">
            Results
          </NavLink>
        </li>
        <li className="Navigation-item">
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
