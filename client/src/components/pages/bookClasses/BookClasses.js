import React,{Fragment, useState} from "react";
import "./bookclasses.css";
import { Link} from "react-router-dom";
import Basket from "../../basket/HaveAccBasket";
import Classes from "../../classes/Classes";
import NoAccBasket from "../../basket/NoAccBasket"
import Navbar from "../../navbar/navbar"
  
const BookClasses = () => {
  return (
    <Fragment>
      <Navbar/>
        <div className="bookClasses">
            <div className="classWrapper">
                <Classes/>
                <NoAccBasket/>
            </div>
      </div>
    </Fragment>
  );
};
export default BookClasses;
