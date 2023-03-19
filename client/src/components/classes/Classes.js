import React,{Fragment, useState} from "react";
import "./classes.css";
import { Link} from "react-router-dom";

  
const Classes = () => {
  return (
    <Fragment>
        <div className="classes">
          <div className="bookClassesDescription">
            <h3>Book a class</h3>
            <p>Select a class to view timetables and availability.</p>
          </div>
          <div className="gridFormat">
            <Link to = "/pilates" className="classItem">
              <img className="classImage" alt="" src="https://images.pexels.com/photos/3984353/pexels-photo-3984353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
              <div className="className">
                <p>Pilates</p>
              </div>
            </Link>

            <Link to = "/aerobics" className="classItem">
              <img className="classImage" alt="" src="https://images.pexels.com/photos/6455793/pexels-photo-6455793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
              <div className="className">
                <p>Aerobics</p>
              </div>
            </Link>

            <Link to = "/yoga" className="classItem">
              <img className="classImage" alt="" src="https://images.pexels.com/photos/8436715/pexels-photo-8436715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
              <div className="className">
                <p>Yoga</p>
              </div>
            </Link>
          </div>
        </div>
    </Fragment>
  );
};
export default Classes;
