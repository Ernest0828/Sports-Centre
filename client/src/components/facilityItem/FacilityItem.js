import React,{Fragment, useState} from "react";
import "./facilityItem.css";
  
const Facilities = ({ facility }) => {
  return (
    <div className="facilityItem">
      <div className="facilityName">
        <p>{facility.facilityName}</p>
      </div>
    </div>
  );
};
export default Facilities;
