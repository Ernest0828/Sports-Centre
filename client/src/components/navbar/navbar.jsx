import React from 'react';
import "./navbar.css"
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item--title">
          <Link to="/dashboard" class="navbar__linkTitle">GymCorp</Link>
        </li>

        <li className = "navbar_right">
            <li className="navbar__item">
              <Link to = "/dashboard" className="navbar__link">Home</Link>
            </li>
            <li className="navbar__item">
              <Link to = "/book-facility" className="navbar__link">Facility</Link>
            </li>
            <li className="navbar__item">
              <a href="/book-class" className="navbar__link">Classes</a>
            </li>
            <li className="navbar__item">
              <Link to = "/membership" className="navbar__link">Membership</Link>
            </li>
            <li className="navbar__item">
              <Link to="/profile" style = {{color: 'orange'}} className="navbar__link">Profile</Link>
            </li>
            <li className="navbar__item">
              <Link to = "/login" className="navbar__link">Logout</Link>
            </li>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;

/*
    <div class="topnav">
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <div class="topnav-right">
    <a href="#search">Search</a>
    <a href="#about">About</a>
  </div>
</div>
*/