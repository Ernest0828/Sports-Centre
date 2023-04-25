import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../../context/Auth";
import "./navbar.css";

const Navbar = () => {
  const { dispatch } = useContext(Auth);
  const {user} = useContext(Auth);

  return (
    <nav className="managerNavbar">
      <div className="managerNavLeft">
        <Link to="/" className="managerNavLogo">
          GymCorp
        </Link>
        <ul className="managerNavList">
          <li className="managerNavItem">
            <Link to="/facilitydetails" className="managerNavLink">
              Facilities
            </Link>
          </li>
          <li className="managerNavItem">
            <Link to="/activitydetails" className="managerNavLink">
              Activities
            </Link>
          </li>
          <li className="managerNavItem">
            <Link to="/classdetails" className="managerNavLink">
              Classes
            </Link>
          </li>
          <li className="managerNavItem">
            <Link to="/staff" className="managerNavLink">
              Employees
            </Link>
          </li>
          <li className="managerNavItem">
            <Link to="/membershipdetails" className="managerNavLink">
              Memberships
            </Link>
          </li>
        </ul>
      </div>
    
      <div className="managerNavRight">
        {user && 
        <ul className="managerNavList">
          <li className="managerNavItem">
            <Link to="/manager-profile" className="managerNavLink" >
              Profile
            </Link>
          </li>
        </ul>
        }
        
        {user && 
        <ul className="managerNavList">
          <li className="managerNavItem">
          <Link to="/" className="managerNavLink managerNavLogout" onClick={() => dispatch({ type: "LOGOUT" }) && window.location.reload()}>
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
