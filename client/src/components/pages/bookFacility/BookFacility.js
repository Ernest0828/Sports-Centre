import React,{Fragment, useState} from "react";
import "./bookfacility.css";
import { Link} from "react-router-dom";
import Basket from "../../basket/HaveAccBasket";
import Facilities from "../../facilities/Facilities";
import Navbar from "../../navbar/navbar"

  
const BookFacility = () => {
  return (
    <Fragment>
      <Navbar/>
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
