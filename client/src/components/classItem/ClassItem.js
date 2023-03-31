import React,{Fragment, useState} from "react";
import "./classItem.css";
import { Link } from "react-router-dom";
  
const Classes = ({ classes }) => {
  return (
    <Fragment>
      <div className="classItem">
        <div className="className">
          <p>{classes.className}</p>
        </div>
      </div>
    </Fragment>
  );
};
export default Classes;
