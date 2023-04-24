import React, { Fragment, useState, useEffect } from "react";
import "./pricing.css";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import axios from "axios";

const PricingClass = () => {
    const [classData, setClassData] = useState([]);
    const [facilityData, setFacilityData] = useState([]);
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        async function fetchClassesData() {
            try {
                const res = await axios.get("http://localhost:4000/api/classes/");
                const groupedClasses = res.data.reduce((accumulator, classes) => {
                    const { classId, className, day, startTime, price } = classes;
                    if (accumulator[className]) {
                        accumulator[className].daysAndTimes.push({ day, startTime });
                    } else {
                        accumulator[className] = { classId, className, price, daysAndTimes: [{ day, startTime }] };
                    }
                    return accumulator;
                }, {});
                setClassData(Object.values(groupedClasses));
            } catch(err) {
                console.log(err.response.data);
            }
        }
            async function fetchFacilitiesData() {
                try {
                    const res = await axios.get("http://localhost:4000/api/facilities/");
                    setFacilityData(res.data);
                } catch(err) {
                    console.log(err.response.data);
                }
            }
            async function fetchActivityData() {
                try {
                    const res = await axios.get("http://localhost:4000/api/activities/");
                    setActivityData(res.data);
                } catch(err) {
                    console.log(err.response.data);
                }
            }
        fetchClassesData();
        fetchFacilitiesData();
        fetchActivityData();
    }, []);

    // Filter out the "Studio" facility
    const filteredFacilities = facilityData.filter(
        (facility) => facility.facilityName !== "Studio");

    return (
        <Fragment>
            <Navbar />
            <div className="scrollable-container">
                <div className="pricing-container">
                    <div className="membership-container">
                        <h2 className="title">GymCorp Membership</h2>
                        <p className="header">Join GymCorp today and get full access to our facilities for a great value.</p>
                        <div className="grid-container">
                            <div className="grid-item">
                                <h3>Monthly</h3>
                                <p className="price">£35.00</p>
                                <button className="join-button">Join Now</button>
                            </div>
                            <div className="grid-item">
                                <h3>Annual</h3>
                                <p className="price">£300.00</p>
                                <button className="join-button">Join Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="classes-container">
                    <h2 className="title">Classes</h2>
                    <p className="header">We hold our classes every week at the Studio.</p>
                    <div className="class-list">
                    {classData.map((classes) => (
                        <div key={classes.classId} className="class-item">
                        <h3>{classes.className}</h3>
                        {classes.daysAndTimes.map(({ day, startTime }) => {
                            const [hour, minute] = startTime.split(":")
                            const suffix = hour >= 12 ? 'PM' : 'AM';
                            const hour12 = hour % 12 || 12;
                            return (
                                <div key={`${day}-${startTime}`}>
                                <p>{day} at {hour12}:{minute} {suffix}</p>
                                </div>);
                        })}        
                        <p className="price">£{classes.price}.00</p>        
                        </div>        
                    ))}            
                    </div>            
                </div>
                <div className="facility-container">
                    <h2 className="title">Activities</h2>
                    <p className="header">Check out all activities that we offer at each of our facilities.</p>
                    <div className="facility-list">
                    {filteredFacilities.map((facility) => (
                        <div key={facility.facilityName} className="facility-item">
                        <h3>{facility.facilityName}</h3>
                        <p>{activityData.filter((activity) => activity.facilityName === facility.facilityName).map((activity) => (
                            <p key={activity.activityId}>
                            {activity.activityName}: <span className="facility-price">£{activity.price}.00</span>
                            </p>
                        ))}
                        </p>    
                        </div>
                    ))}
                    </div>
                </div>              
            </div>
        </Fragment>
    );
};

export default PricingClass

