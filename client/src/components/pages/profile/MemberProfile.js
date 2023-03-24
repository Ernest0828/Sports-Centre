import React, { Fragment, useState } from "react";
import "./memberProfile.css";
import { Link } from "react-router-dom";
import ProfileInfo from "../../profileInfo/MemberProfileInfo";
import Navbar from "../../navbar/navbar"

const MemberProfile = () => {
    const [bookings, setBookings] = useState([
        { id: 1, facility: "Sports Hall", description: "Volleyball", time: "16:00", date: "19/2/2023" },
        { id: 2, facility: "Swimming Pool", description: "Lap Swim", time: "17:00", date: "20/2/2023" },
        { id: 3, facility: "Gym", description: "Weights", time: "18:00", date: "21/2/2023" }
    ]);

    const handleDelete = id => {
        const newBookings = bookings.filter(booking => booking.id !== id);
        setBookings(newBookings);
    };

    return (
        <Fragment>
            <Navbar/>
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
                                        <th>Description</th>
                                        <th>Time</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <tr key={booking.id}>
                                            <td>{booking.facility}</td>
                                            <td>{booking.description}</td>
                                            <td>{booking.time}</td>
                                            <td>{booking.date}</td>
                                            <td><button className="profileDeleteBookingBtn" onClick={() => handleDelete(booking.id)}>Delete</button></td>
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