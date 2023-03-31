import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import Navbar from "../../navbar/navbarLoggedIn";
import "./dashboard.css";
import Carousel from "./Carousel";
import {sports} from "./Data";

const Dashboard = () => {
  return (
    <Fragment>
      <Navbar/>
      <div className="first-container">
      <div className = "upper-container">
      <Carousel images={sports} />
      <div className = "text-container">
      <p> Welcome to GymCorp</p>
      <p>Enjoy 15% off</p>
      <p>when you book </p> 
      <p>3 classes</p>
      </div>
      <div className = "bottom-container">
      <Link to = "/climbingwall" className="dashItem">
              <img className="dashImage" alt="" src="https://cdn.pixabay.com/photo/2013/03/20/14/47/sports-hall-95270_960_720.jpg"/>
              <div className="dashName">
                <p>Book a Facility</p>
              </div>
            </Link>
            <Link to = "/climbingwall" className="dashItem">
              <img className="dashImage" alt="" src="https://cdn.pixabay.com/photo/2022/08/13/12/13/yoga-7383498_960_720.jpg"/>
              <div className="dashName">
                <p>Book a Class</p>
              </div>
            </Link>
            <Link to = "/membership" className="dashItem">
              <img className="dashImage" alt="" src="https://cdn.pixabay.com/photo/2019/08/05/12/10/sunset-4385923_960_720.jpg"/>
              <div className="dashName">
                <p>Buy a membership</p>
              </div>
            </Link>
      </div>
      </div>
      </div>
      
      
    </Fragment>
  );
};
export default Dashboard;


