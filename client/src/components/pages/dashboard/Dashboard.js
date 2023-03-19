import React, { Fragment } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";

const Classes = () => {
  return (
    <Fragment>
      <div className="gridFormat">  
        <div className="classItem">
          <img
            className="classImage"
            alt=""
            src="https://images.pexels.com/photos/3984353/pexels-photo-3984353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <div className="className">
            <p>Book a Facility</p>
          </div>
        </div>

        <div className="classItem">
          <img
            className="classImage"
            alt=""
            src="https://images.pexels.com/photos/6455793/pexels-photo-6455793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <div className="className">
            <p>Book a Class</p>
          </div>
        </div>

        <div className="classItem">
          <img
            className="classImage"
            alt=""
            src="https://images.pexels.com/photos/8436715/pexels-photo-8436715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <div className="className">
            <p>Buy a Membership</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Classes;
