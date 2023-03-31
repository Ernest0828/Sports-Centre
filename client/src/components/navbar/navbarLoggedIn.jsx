import React, {Fragment, useState, useEffect, useContext} from "react";
import "./navbarLoggedIn.css"
import { Link } from 'react-router-dom';
import {Auth} from "../../context/Auth"


const Navbar = () => {
  const {dispatch} = useContext(Auth);

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item--title">
          <Link to="/" class="navbar__linkTitle">GymCorp</Link>
        </li>

        <li className = "navbar_right">
            <li className="navbar__item">
              <Link to = "/" className="navbar__link">Home</Link>
            </li>
            <li className="navbar__item">
              <Link to = "/book-facility" className="navbar__link">Facility</Link>
            </li>
            <li className="navbar__item">
              <a href="/book-class" className="navbar__link">Classes</a>
            </li>
            <li className="navbar__item">
              <Link to = "/pricing" className="navbar__link">Pricing</Link>
            </li>
            <li className="navbar__item">
              <Link to="/profile" className="navbar__link">Profile</Link>
            </li>
            <li className="navbar__item">
              <Link to = "/" className="navbar__link" onClick={ ()=> dispatch({type: "LOGOUT"})}>Logout</Link>
            </li>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;