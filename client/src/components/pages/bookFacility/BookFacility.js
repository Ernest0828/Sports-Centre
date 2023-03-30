import React,{Fragment, useState} from "react";
import "./bookfacility.css";
import { Link} from "react-router-dom";
import Basket from "../../basket/HaveAccBasket";
import FacilityItem from "../../facilityItem/FacilityItem";
import NoAccBasket from "../../basket/NoAccBasket"
import Navbar from "../../navbar/navbar"

  
const BookFacility = () => {
  return (
    <Fragment>
      <Navbar/>
        <div className="bookFacilities">
            <div className="facWrapper">
              <div className="facilities">
                <div className="bookFacilityDescription">
                  <h3>Book a facility</h3>
                  <p>Select a facility to view timetables and availability.</p>
                </div>
                <div className="gridFormat">
                  <FacilityItem/>
                </div>
              </div>
              <Basket/>
            </div>
      </div>
    </Fragment>
  );
};
export default BookFacility;
