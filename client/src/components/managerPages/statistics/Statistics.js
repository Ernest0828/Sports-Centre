import React, { Fragment, useState, useEffect } from "react";
import "./statistics.css";
import Navbar from "../managerNavbar/ManagerNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch"
import moment from 'moment';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';


  
const Statistics = () => {

    //Get booking data
    const {data:bookingData, loading:bookingLoading, error:bookingError} = useFetch ("http://localhost:4000/api/bookings/");
    const [bookingDetails, setBookingDetails] = useState([])
    useEffect(() => {
        setBookingDetails(bookingData.map(({noOfPeople, date, startTime, endTime, bookingType, activityId, classId,facilityName}) => {
        return {
            noOfPeople,
            date,
            startTime, 
            endTime, 
            bookingType, 
            activityId, 
            classId,
            facilityName,
        };
      }));
      console.log("booking details:", bookingDetails);
    }, [bookingData]);



    //Get activity data
    const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:4000/api/activities/");
    const [activityDetails, setActivityDetails] = useState([])
    useEffect(() => {
        setActivityDetails(activityData.map(({ activityId, activityName, facilityName }) => {
          return {
            activityId,
            activityName,
            facilityName
          };
        }));      
        // console.log("activityDetails:",activityDetails);
      }, [activityData]);



    //Get facility data
    const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:4000/api/facilities/");
    const [facilityDetails, setFacilityDetails] = useState([]);
    useEffect(()=>{
        setFacilityDetails(facilityData.map(({facilityName})=>{
            return{
                facilityName,
              };
        }));
    },[facilityData]);


    //handle sidebar clicking
    const [selectedFacility, setSelectedFacility] = useState("Summary");
    const handleFacilityClick = (facility) => {
        setSelectedFacility(facility);
    }; 

    
    //chart data
    const [graphData, setGraphData] = useState();

    useEffect(() => {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
        const facilities = ["Studio","Swimming pool", "Fitness room","Sports hall","Squash court", "Climbing wall"];

        // create an initial array with every combination of day and facility set to 0
        const initFacDay = daysOfWeek.map(day => {
            const facToDay = { day };
            facilities.forEach(facility => facToDay[facility] = 0);
            // console.log("factoday:",facToDay);
            return facToDay;
        });

        // {facilityName:Swimming pool, activityNames:["general use", ...]}
        const groupedActivities = activityDetails.reduce((acc, curr) => {
            const { facilityName, activityName, activityId } = curr;
            const facility = acc.find((f) => f.facilityName === facilityName);
            if (facility) {
              facility.activityNames.push(activityName);
              facility.activityIds.push(activityId);
            } else {
              acc.push({ facilityName, activityNames: [activityName], activityIds: [activityId] });
            }
            return acc;
        }, []);
        // console.log("groupedActivities",groupedActivities);

        //create an initial array with every combination of day and activity set to 0 
        const initActivityDay = daysOfWeek.map(day => {
            const activityToDay = { day };
            groupedActivities
                .filter(group => group.facilityName === selectedFacility)
                .flatMap(group => group.activityNames)
                .forEach(activity => {
                activityToDay[activity] = 0;
            });

            // console.log("test",groupedActivities.filter(group => group.facilityName === selectedFacility).flatMap(group => group.activityNames)
            // )

            return activityToDay;
        });
        console.log("initActivityDay", initActivityDay);        


        //get graph data for Summary
        const summaryData = bookingDetails.reduce((acc, curr) => {
            //change date to day
            const formatDate = new Date(curr.date);
            formatDate.setUTCHours(0, 0, 0, 0);
            const day = daysOfWeek[formatDate.getUTCDay()];
            const {facilityName, noOfPeople} = curr;
            //facilityIndex used for Summary
            const facilityIndex = acc.findIndex(f => f.day === day);
            acc[facilityIndex][facilityName] += noOfPeople;   
            return acc;
        }, initFacDay);

        // chart data for activities
        const activityData = bookingDetails.reduce((acc, curr) => {
            //change date to day
            const formatDate = new Date(curr.date);
            formatDate.setUTCHours(0, 0, 0, 0);
            const day = daysOfWeek[formatDate.getUTCDay()];
            const {noOfPeople , activityId,facilityName} = curr;
            const activityName = groupedActivities.findIndex(f => f.facilityName === facilityName);
            console.log("curr",curr);
            //activityIndex used for each activity
            const activityIndex = acc.findIndex(a => a.day === day);
            acc[activityIndex][activityName] += noOfPeople;     
            console.log("acc",acc);
            return acc;
        }, initActivityDay);

        selectedFacility === "Summary" ? setGraphData(summaryData) :
        setGraphData(activityData)

}, [bookingDetails,activityDetails,selectedFacility]);


    //For choosing week 
    const [dateRange, setDateRange] = useState({
        start: moment().startOf('week'),
        end: moment().endOf('week')
    });

    const handleBackWeek = () => {
        setDateRange({
            start: moment(dateRange.start).subtract(1, 'week').startOf('week'),
            end: moment(dateRange.end).subtract(1, 'week').endOf('week')
        });
    };

    const handleForwardWeek = () => {
        setDateRange({
            start: moment(dateRange.start).add(1, 'week').startOf('week'),
            end: moment(dateRange.end).add(1, 'week').endOf('week')
        });
    };

    //Colors for graph
    const colors = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#8bd3c7"];


    return (
        <Fragment>
        <Navbar />
        <div className="statistics">
            <div className="statsWrapper">
                <div className="statsDescription">
                <h3>Usage and Revenue</h3>
                <p>Select a facility to view usage.</p>
                </div>
                <div className="statsChooseDate">
                    <div className="statsDateArrow left">
                        <button onClick={handleBackWeek}>
                            {'<'}
                        </button>
                    </div>
                    <p>{dateRange.start.format('D/M/YYYY')} - {dateRange.end.format('D/M/YYYY')}</p>
                    <div className="statsDateArrow right">
                        <button onClick={handleForwardWeek}>
                            {'>'}
                        </button> 
                    </div> 
                </div>
                <div className="statsBottom">
                    <div className="statsLeft">
                        <ul className="statsNavList">
                            <li className="statsNavItem">
                                <button className="statsNavButton" onClick={() => handleFacilityClick("Summary")}>
                                    Summary
                                </button>
                            </li>
                            <li className="statsNavItem">
                                <button className="statsNavButton" onClick={() => handleFacilityClick("Studio")}>
                                    Studio
                                </button>
                            </li>
                            <li className="statsNavItem">
                                <button className="statsNavButton" onClick={() => handleFacilityClick("Swimming pool")}>
                                    Swimming pool
                                </button>
                            </li>
                            <li className="statsNavItem">
                                <button className="statsNavButton" onClick={() => handleFacilityClick("Fitness room")}>
                                    Fitness room
                                </button>
                            </li>
                            <li className="statsNavItem">
                                <button className="statsNavButton" onClick={() => handleFacilityClick("Sports hall")}>
                                    Sports hall
                                </button>
                            </li>
                            <li className="statsNavItem">
                                <button className="statsNavButton" onClick={() => handleFacilityClick("Squash court")}>
                                    Squash court
                                </button>
                            </li>
                            <li className="statsNavItem">
                                <button className="statsNavButton" onClick={() => handleFacilityClick("Climbing wall")}>
                                    Climbing wall
                                </button>
                            </li>
                        </ul>
                                    
                    </div>
                    <div className="statsRight"> 
                        <h3>
                            {selectedFacility} 
                        </h3>
                        <BarChart
                            width={900}
                            height={400}
                            data={graphData}
                            margin={{ top: 10, right: 30, left: 90, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {selectedFacility === "Summary" ? facilityDetails.map((facility,index)=>(
                                <Bar dataKey={facility.facilityName} stackId="day" fill={colors[index]} legendType="circle" /> //change fill color later
                            )) : 
                            activityDetails.map((activity,index)=>(
                                <Bar dataKey={activity.activityName} stackId="day" fill={colors[index]} legendType="circle" />
                            ))}
                        </BarChart>
                    </div>
                </div>
                    {/* {console.log("summaryData:",summaryData)}; */}
            </div>
        </div>
        </Fragment>
    );
};
export default Statistics;
