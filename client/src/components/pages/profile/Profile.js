import React,{Fragment, useState, useEffect, useContext} from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import ProfileInfo from "../../profileInfo/ProfileInfo";
import {Auth} from "../../../context/Auth"
import axios from "axios";


const MemberProfile = () => {

    const {user} = useContext(Auth);
    const [bookings, setBookings] = useState([]);
    const [activityNames, setActivityNames] = useState([]);

    //get bookings 
    useEffect(() => {
        async function fetchUserBooking() {
          try{
                const res = await axios.get("http://localhost:5000/api/bookings/bookings/"+ user.details.customerId);
                setBookings(res.data);
                // console.log("bookings",bookings[0]);
                console.log(res.data);
          }
          catch(err){
              console.log(err.response.data);
          }
        }
        fetchUserBooking();
    }, [user.details.customerId, bookings]);

    //get booking activity inspired by gpt
    useEffect(() => {
        async function fetchBookingActivity() {
            try{
                //maps each arr in bookings and gets the activity name
                const activityName = bookings.map(async booking => {
                    const res = await axios.get("http://localhost:5000/api/activities/find/"+booking.activityId);
                    return res.data.activityName;
                });
                //array of activity names. Promise.all resolves each promise (name of each booking)
                const activityNames = await Promise.all(activityName);
                setActivityNames(activityNames);
            }
            catch(err){
                console.log(err.response.data);
            }
        } fetchBookingActivity();
    }, [bookings]);

    //delete booking
    const handleDelete = Id => {
        const newBookings = bookings.filter(booking => booking.bookingId !== Id);
        setBookings(newBookings);
    };

    return (
        <Fragment>
            <div className="profile">
                <div className="profileWrapper">
                    <ProfileInfo />
                    <div className="profileRight">
                        <span className="userBookingsTitle">Your bookings</span>
                        <div className="userBookingsTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Facility</th>
                                        <th>Activity</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={booking.bookingId}>
                                        <td>{booking.facilityName}</td>
                                        <td>{activityNames[index]}</td>
                                        <td>{booking.date.split("T")[0]}</td>
                                        <td>{booking.startTime}</td>
                                        <td><button className="profileDeleteBookingBtn" onClick={() => handleDelete(booking.bookingId)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
     );
};

export default MemberProfile;