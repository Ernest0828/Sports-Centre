import React,{Fragment, useEffect, useState} from "react";
import "./bookclasses.css";
import { Link} from "react-router-dom";
import Basket from "../../basket/Basket";
import ClassItem from "../../classItem/ClassItem";
import Navbar from "../../navbar/navbar";
import axios from "axios"
import { useNavigate } from "react-router-dom";
  
const BookClasses = () => {
  const [classes, setClasses] = useState([]);
  const navigate =useNavigate();
  const handleClick = () =>{
    navigate('/aerobics');
  }


  useEffect(() => {
  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/classes/");
      const uniqueClasses = Array.from(new Set(res.data.map(c => c.className))).map(cn => {
        return res.data.find(c => c.className === cn);
      });
      setClasses(uniqueClasses);
    } catch (err) {
      console.error(err);
    }
  };

  fetchClasses();
}, []);

   return (
    <Fragment>
    <Navbar/>
      <div className="bookClasses">
        <div className="classWrapper">
          <div className="classes">
            <div className="bookClassesDescription">
              <h3>Book a class</h3>
              <p>Select a class to view timetables and availability.</p>
            </div>
            <div className="gridFormat" onClick={handleClick}>
              {classes.map((classes) => (
                <ClassItem key={classes.className} classes={classes}/>
              ))}
            </div>
          </div>
          <Basket />
        </div>
      </div>
    </Fragment>
  )
};
export default BookClasses;
