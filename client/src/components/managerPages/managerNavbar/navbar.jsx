import React from 'react';
import "./navbar.css"
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item--title">
          <a href="#" class="navbar__linkTitle">GymCorp</a>
        </li>
          <li className="navbar__item">
            <Link to = "/facilitydetails" className="navbar__link">Facilities</Link>
          </li>
          <li className="navbar__item">
            <Link to = "/classdetails" className="navbar__link">Classes</Link>
          </li>
          <li className="navbar__item">
            <a href="/memberships" className="navbar__link">Memberships</a>
          </li>
          <li className="navbar__item">
            <Link to = "/staff" className="navbar__link">Staff</Link>
          </li>
          <li className="navbar__item">
            <a href="/manager-profile" style = {{color: 'orange'}} className="navbar__link">Manager</a>
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