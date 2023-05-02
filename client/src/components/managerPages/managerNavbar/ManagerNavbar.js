import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../../context/Auth";
import {FaBars, FaTimes} from "react-icons/fa"

import "./manager-navbar.css";

const ManagerNavbar = () => {
  const { dispatch } = useContext(Auth);
  const {user} = useContext(Auth);


  /*const showNav = () => {

  }*/


  return (
    <nav className="managerNavbar">
      <div className="managerNavLeft">
        <Link to="/employee-profile" className="managerNavLogo">
          GymCorp
        </Link>
        <ul className="managerNavList">
        {user.isManager &&
        <div className="managerNavDropdown">
        <Link to="/facilitydetails" className="managerNavDropdownTrigger managerNavLink" onClick={() => window.location.href="/facilitydetails"}>
          Amenities
        </Link>
        <ul className="managerNavDropdownList">
          <li className="managerNavItem" onClick={() => window.location.href="/facilitydetails"}>
              Facilities
          </li>
          <li className="managerNavItem" onClick={() => window.location.href="/activitydetails"}>
              Activities
          </li>
          <li className="managerNavItem" onClick={() => window.location.href="/classdetails"}>
              Classes
          </li>
        </ul>
      </div>
        }
        {user.isManager && 
          <li className="managerNavItem">
            <Link to="/staff" className="managerNavLink">
              Employees
            </Link>
          </li>
        }
          <li className="managerNavItem">
            <Link to="/membershipdetails" className="managerNavLink">
              Memberships
            </Link>
          </li>
          <li className="managerNavItem">
            <Link to="/bookingdetails" className="managerNavLink">
              Bookings
            </Link>
          </li>
          {user.isManager &&
          <li className="managerNavItem">
            <Link to="/statistics" className="managerNavLink">
              Statistics
            </Link>
          </li>
        }
        </ul>
      </div>
    
      <div className="managerNavRight">
        {user && 
        <ul className="managerNavList">
          <li className="managerNavItem">
            <Link to="/employee-profile" className="managerNavLink" >
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
        <button>
          <FaTimes />
        </button>
        
      </div>
      <button>
        <FaBars />
      </button>
    </nav>
  );
};

export default ManagerNavbar;
