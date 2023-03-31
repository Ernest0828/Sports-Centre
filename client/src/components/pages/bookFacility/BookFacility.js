import React, { Fragment, useState, useEffect } from "react";
import "./bookfacility.css";
import Basket from "../../basket/HaveAccBasket";
import FacilityItem from "../../facilityItem/FacilityItem";
import Navbar from "../../navbar/navbar";
import axios from "axios";

  
const BookFacility = () => {

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/facilities/");
        setFacilities(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFacilities();
  }, []);
  return (
    <Fragment>
    <Navbar />
      <div className="bookFacilities">
        <div className="facWrapper">
          <div className="facilities">
            <div className="bookFacilityDescription">
              <h3>Book a facility</h3>
              <p>Select a facility to view timetables and availability.</p>
            </div>
            <div className="gridFormat">
              {facilities.map((facility) => (
              <FacilityItem key={facility.facilityName} facility={facility} />
              ))}
            </div>
          </div>
          <Basket />
        </div>
      </div>
    </Fragment>
  );
};
export default BookFacility;
