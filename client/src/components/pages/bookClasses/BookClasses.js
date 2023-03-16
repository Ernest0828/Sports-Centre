import React,{Fragment, useState} from "react";
import "./bookclasses.css";
import { Link} from "react-router-dom";
import Basket from "../../basket/Basket";
import Classes from "../../classes/Classes";

  
const BookClasses = () => {
  return (
    <Fragment>
        <div className="bookClasses">
            <div className="classWrapper">
                <Classes/>
                <Basket/>
            </div>
      </div>
    </Fragment>
  );
};
export default BookClasses;
