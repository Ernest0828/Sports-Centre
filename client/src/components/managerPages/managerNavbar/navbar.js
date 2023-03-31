import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../../context/Auth";
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
            <Link to="/facilitydetails" className="navLink">
              Facilities
            </Link>
          </li>
          <li className="navItem">
            <Link to="/classdetails" className="navLink">
              Classes
            </Link>
          </li>
          <li className="navItem">
            <Link to="/staff" className="navLink">
              Staff
            </Link>
          </li>
          {/*<li className="navItem">
            <Link to="/pricing" className="navLink">
              Pricing
            </Link>
            </li>*/}
        </ul>
      </div>
    
      <div className="navRight">
        {user && 
        <ul className="navList">
          <li className="navItem">
            <Link to="/manager-profile" className="navLink">
              Profile
            </Link>
          </li>
        </ul>
        }
        
        {user && 
        <ul className="navList">
          <li className="navItem">
          <Link to="/" className="navLink navLogout" onClick={() => dispatch({ type: "LOGOUT" })}>
            Logout
          </Link>
          </li>
        </ul>
        }
        
      </div>
    </nav>
  );
};

export default Navbar;
