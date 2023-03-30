import React,{Fragment, useEffect, useState} from "react";
import "./bookclasses.css";
import { Link} from "react-router-dom";
import Basket from "../../basket/HaveAccBasket";
import ClassItem from "../../classItem/ClassItem";
import NoAccBasket from "../../basket/NoAccBasket"
import axios from "axios"
  
const BookClasses = () => {
  const [classItem, setClassItem] = useState([]);
  useEffect(() => {
    const fetchClassItem = async ()=>{
      const res = await axios.get("/api/classes")
      console.log(res)
    }
    fetchClassItem();

  },[])

  
  return (
    <Fragment>
        <div className="bookClasses">
            <div className="classWrapper">
                {/* <Classes/> */}
              <div className="classes">
                <div className="bookClassesDescription">
                  <h3>Book a class</h3>
                  <p>Select a class to view timetables and availability.</p>
                </div>
                <div className="gridFormat">
                  <ClassItem/>
                </div>
              </div>
              <NoAccBasket/>
            </div>
      </div>
    </Fragment>
  );
};
export default BookClasses;
