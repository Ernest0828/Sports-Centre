import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../context/Auth";
import "./navbar.css";

const Navbar = () => {
  const { dispatch } = useContext(Auth);
  const {user} = useContext(Auth);

  return (
    <nav className="navbar">
      <div className="navLeft">
        <Link to="/" className="navLogo">
          GymCorp
        </Link>
        <ul className="navList">
          <li className="navItem">
            <Link to="/" className="navLink">
              Home
            </Link>
          </li>
          <li className="navItem">
            <Link to="/book-facility" className="navLink">
              Facility
            </Link>
          </li>
          <li className="navItem">
            <Link to="/book-class" className="navLink">
              Classes
            </Link>
          </li>
          <li className="navItem">
            <Link to="/pricing" className="navLink">
              Pricing
            </Link>
          </li>
        </ul>
      </div>
    
      <div className="navRight">
        {user && 
        <ul className="navList">
          <li className="navItem" onClick={() => window.location.reload()}>
            <Link to="/profile" className="navLink">
              Profile
            </Link>
          </li>
        </ul>
        }
        
        {user ? (
          <Link to="/" className="navLink navLogout" onClick={() => dispatch({ type: "LOGOUT" })}>
            Logout
          </Link>
        ):(
          <div className="navDropdown">
          <Link to="/login" className="navDropdownTrigger navLink" onClick={() => window.location.href="/login"}>
            Login
          </Link>
          <ul className="navDropdownList">
            <li className="navItem" onClick={() => window.location.href="/login"}>
                User
            </li>
            <li className="navItem" onClick={() => window.location.href="/manager-login"}>
                Staff
            </li>
          </ul>
        </div>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
