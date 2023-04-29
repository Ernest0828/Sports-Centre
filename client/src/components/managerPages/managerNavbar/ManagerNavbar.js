import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../../context/Auth";
import "./manager-navbar.css";

const ManagerNavbar = () => {
  const { dispatch } = useContext(Auth);
  const {user} = useContext(Auth);
  const {isManager} = useContext(Auth);


  return (
    <nav className="managerNavbar">
      <div className="managerNavLeft">
        <Link to="/manager-profile" className="managerNavLogo">
          GymCorp
        </Link>
        <ul className="managerNavList">
        {isManager &&
          <li className="managerNavItem">
            <Link to="/facilitydetails" className="managerNavLink">
              Facilities
            </Link>
          </li>
        }
        {isManager &&
          <li className="managerNavItem">
            <Link to="/activitydetails" className="managerNavLink">
              Activities
            </Link>
          </li>
        }   
        {isManager &&
          <li className="managerNavItem">
            <Link to="/classdetails" className="managerNavLink">
              Classes
            </Link>
          </li>
        }
        {isManager &&
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
          {isManager &&
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

export default ManagerNavbar;
