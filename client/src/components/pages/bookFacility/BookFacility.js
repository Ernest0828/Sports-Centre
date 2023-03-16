import React,{Fragment, useState} from "react";
import "./bookfacility.css";
import { Link} from "react-router-dom";
import Basket from "../../basket/Basket";
import Facilities from "../../facilities/Facilities";

  
const BookFacility = () => {
  return (
    <Fragment>
        <div className="bookFacilities">
            <div className="facWrapper">
                <Facilities/>
                <Basket/>
            </div>
      </div>
    </Fragment>
  );
};
export default BookFacility;
