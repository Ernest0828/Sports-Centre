import React,{Fragment, useState} from "react";
import "./facilities.css";
import { Link} from "react-router-dom";

  
const Facilities = () => {
  return (
    <Fragment>
        <div className="facilities">
          <div className="bookFacilityDescription">
            <h3>Book a facility</h3>
            <p>Select a facility to view timetables and availability.</p>
          </div>
          <div className="gridFormat">
            <div className="facilityItem">
              <img className="facilityImage" alt="" src="https://images.pexels.com/photos/2250432/pexels-photo-2250432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
              <div className="facilityName">
                <p>Swimming Pool</p>
              </div>
            </div>

            <div className="facilityItem">
              <img className="facilityImage" alt="" src="https://images.pexels.com/photos/6739958/pexels-photo-6739958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
              <div className="facilityName">
                <p>Fitness Room</p>
              </div>
            </div>

            <div className="facilityItem">
              <img className="facilityImage" alt="" src="https://images.pexels.com/photos/7648075/pexels-photo-7648075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
              <div className="facilityName">
                <p>Squash Court</p>
              </div>
            </div>

            <div className="facilityItem">
              <img className="facilityImage" alt="" src="https://images.pexels.com/photos/5384636/pexels-photo-5384636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
              <div className="facilityName">
                <p>Climbing Wall</p>
              </div>
            </div>

            <div className="facilityItem">
              <img className="facilityImage" alt="" src="https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
              <div className="facilityName">
                <p>Studio</p>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};
export default Facilities;
